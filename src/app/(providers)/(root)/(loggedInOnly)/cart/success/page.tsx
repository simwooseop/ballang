/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function Toss() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    async function confirm() {
      const requestData = {
        orderId: searchParams.get("orderId"),
        amount: searchParams.get("amount"),
        paymentKey: searchParams.get("paymentKey"),
      };

      try {
        const response = await axios.post(
          "https://rocky-savannah-73617-984b81b13be1.herokuapp.com/toss",
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.data;

        return result;
      } catch (e) {
        console.log(e);
      }
    }

    confirm()
      .then((data) => {
        setResponseData(data);
      })
      .catch((error) => {
        router.replace(`/fail?code=${error.code}&message=${error.message}`);
      });
  }, [searchParams, router]);

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col items-center">
      <div className="box_section flex flex-col items-center">
        <img
          width="100px"
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
        />
        <h2>결제를 완료했어요</h2>
        <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
          <div className="p-grid-col text--left">
            <b>결제금액</b>
          </div>
          <div className="p-grid-col text--right" id="amount">
            {`${Number(searchParams.get("amount")).toLocaleString()}원`}
          </div>
        </div>
        <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
          <div className="p-grid-col text--left">
            <b>주문번호</b>
          </div>
          <div className="p-grid-col text--right" id="orderId">
            {`${searchParams.get("orderId")}`}
          </div>
        </div>
      </div>
      <div
        className="box_section"
        style={{ width: "600px", textAlign: "left" }}
      >
        <b>Response Data :</b>
        <div id="response" style={{ whiteSpace: "initial" }}>
          {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
        </div>
      </div>
    </div>
  );
}

function TossSuccessPage() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <Toss />
    </Suspense>
  );
}

export default TossSuccessPage;
