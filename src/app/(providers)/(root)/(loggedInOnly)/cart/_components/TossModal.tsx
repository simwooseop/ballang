"use client";

import {
  loadTossPayments,
  TossPaymentsWidgets,
} from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";

const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
const customerKey = generateRandomString();

function generateRandomString() {
  return Buffer.from(Math.random().toString().slice(0, 20)).toString("base64");
}

interface TossModalProps {
  amount: number;
  customerEmail: string;
  customerName: string;
  orderName: string;
}

function TossModal({
  amount,
  customerEmail,
  customerName,
  orderName,
}: TossModalProps) {
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      if (!clientKey) throw new Error("Toss client key is not defined");

      const tossPayments = await loadTossPayments(clientKey);
      const widgets = tossPayments.widgets({ customerKey });
      setWidgets(widgets);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!widgets) {
        return;
      }
      const data = {
        currency: "KRW",
        value: amount,
      };
      await widgets.setAmount(data);

      await Promise.all([
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    })();
  }, [widgets, amount]);

  return (
    widgets && (
      <div className="w-[420px]">
        <div className="wrapper">
          <div className="box_section flex flex-col">
            {/* 결제 UI */}
            <div id="payment-method" />
            {/* 이용약관 UI */}
            <div id="agreement" />

            {/* 결제하기 버튼 */}
            <button
              className="border border-orange-200 mx-36 h-10 rounded-md bg-orange-300"
              disabled={!ready}
              onClick={async () => {
                try {
                  // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                  // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
                  await widgets.requestPayment({
                    orderId: generateRandomString(),
                    orderName,
                    successUrl: window.location.href + "/success",
                    failUrl: window.location.href + "/fail",
                    customerEmail,
                    customerName,
                  });
                } catch (error) {
                  // 에러 처리하기
                  console.error(error);
                }
              }}
            >
              결제하기
            </button>
          </div>
          <div className="box_section"></div>
        </div>
      </div>
    )
  );
}

export default TossModal;
