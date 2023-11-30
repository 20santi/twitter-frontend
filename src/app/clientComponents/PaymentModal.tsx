"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { ImCross } from "react-icons/im";
import { graphqlClient } from "../clients/api";
import { capturePaymentQuery } from "../graphql/query/user";
import toast from "react-hot-toast";
import { VerifyPaymentMutation } from "../graphql/mutation/user";
import { useCurrentUser } from "../hooks/user";
import { TypedQueryDocumentNode } from "graphql";

interface ModalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Order {
  id: string;
  entity?: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string | null;
  offer_id: string | null;
  status: string;
  attempts: number;
  notes: [];
  created_at: number;
  razorpay: string;
}

interface paymentType {
  capturePayment: Order;
}

export const PaymentModal = ({ setModal }: ModalProps) => {
  const { user } = useCurrentUser();

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function buySubscription(id: string) {
    const toastId = toast.loading("Loading...");
    try {
      //load the script
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        toast.error("Razorpay SDK failed to load");
        return;
      }

      //initiate the order
      const orderResponse: paymentType = await graphqlClient.request(
        capturePaymentQuery as TypedQueryDocumentNode
      );
      console.log("Order response:--------------", orderResponse);

      //options
      const options = {
        key: orderResponse.capturePayment.razorpay,
        currency: orderResponse.capturePayment.currency,
        amount: orderResponse.capturePayment.amount,
        order_id: orderResponse.capturePayment.id,
        name: "Twitter",
        description: "You are a subscribe user",
        prefill: {
          name: `${user.firstName}`,
        },
        handler: function (response) {
          // verify payment
          verifyPayment({ ...response, id });
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      paymentObject.on("payment.failed", function (response) {
        toast.error("oops, Payment failed");
        console.log("error while payment:------------------", response.error);
      });
    } catch (error) {
      console.log("Payment api error: ", error);
      toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
  }

  //verify payment
  async function verifyPayment(bodyData) {
    console.log("response in verifyPayment:--------------> ", bodyData);
    const toastId = toast.loading("Verify Payment...");
    try {
      const response = await graphqlClient.request(VerifyPaymentMutation, {
        data: bodyData,
      });
      if (!response) {
        throw new Error("Payment not verify");
      }
      toast.success("Payment successfull");
    } catch (error) {
      console.log("Payment verify error: ", error);
      toast.error("Could not verify payment");
    }
    toast.dismiss(toastId);
    setModal(false);
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-slate-700 bg-opacity-60 ">
      <div className="w-11/12 max-w-[650px] rounded-xl bg-black p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center p-3 hover:bg-white hover:bg-opacity-10 rounded-full">
            <button onClick={() => setModal(false)} className="text-sm">
              <ImCross />
            </button>
          </div>
        </div>
        <div className="w-full flex items-center justify-center mb-16 mt-8">
          <div className="flex flex-col gap-y-5 items-center">
            <p className="font-bold text-3xl">Who are you ?</p>
            <p>Choose the right subscription for you :</p>
            <div className="flex space-x-4 ">
              <div className="flex flex-col w-[250px] bg-white bg-opacity-10 items-start justify-center p-5 rounded-xl border border-gray-500 cursor-pointer transition duration-300 hover:border-blue-500">
                <p className="text-sm text-[#787979]">Premium</p>
                <p className="text-lg font-bold">I am a individual</p>
                <p className="text-sm text-[#787979]">
                  For individuals and creators
                </p>
              </div>

              <div className="flex flex-col w-[250px] items-start justify-center p-5 bg-white bg-opacity-10 rounded-xl border border-gray-500 cursor-pointer transition duration-300 hover:border-blue-500">
                <p className="text-sm text-[#787979]">Verified Organization</p>
                <p className="text-lg font-bold">I am an organization</p>
                <p className="text-sm text-[#787979]">
                  For businesses, government
                </p>
              </div>
            </div>
            <button onClick={() => buySubscription(user?.id)} className="bg-white rounded-full mt-3 p-2 pl-10 pr-10 text-black font-bold w-full">
              Subscribe
            </button>
            <p className="font-medium">
              Learn more about <span className="text-[#1A8CD8]">Premium</span>{" "}
              and <span className="text-[#1A8CD8]">Verified Organizations</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
