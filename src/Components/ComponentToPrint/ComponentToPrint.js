import React, { useEffect, useState, useRef, forwardRef } from "react";
import { formatDot } from "../../util/helperFunction";
import "./ComponentToPrint.css";

export const ComponentToPrint = forwardRef((props, ref) => {
  const { pecahanUang, total, data, kasir, tanggal } = props;

  const canvasEl = useRef(null);
  const shadowRootHostEl = useRef(null);

  const [checkHeight, setCheckHeight] = useState(null);

  useEffect(() => {
    const ctx = canvasEl.current?.getContext("2d");

    if (ctx) {
      ctx.beginPath();
      ctx.arc(95, 50, 40, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = "rgb(200, 0, 0)";
      ctx.fillRect(85, 40, 20, 20);
      ctx.save();
    }
  }, []);

  useEffect(() => {
    let height = document.getElementById("testClass")?.offsetHeight;
    setCheckHeight(height);
  }, [data]);

  return (
    <>
      <style type="text/css" media="print">
        {`@page { size: 75mm 50mm portrait;`}
      </style>
      <div ref={ref} className="relativeCSS" id="testClass">
        <link href="./as-style.css" rel="stylesheet" />
        <div className="flash" />

        <div style={{ width: "75mm", padding: "4px", color: "darkblue" }}>
          <div>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "16px",
                width: "fit-content",
              }}
            >
              Tiga Harga | Tenar
            </p>
            <p style={{ fontSize: "16px" }}>Kasir : {kasir}</p>
            <p style={{ fontSize: "16px" }}>Tanggal : {tanggal}</p>
          </div>
          <div className="container-header-print">
            <p className="no-element">No.</p>
            <p className="name-element">Item</p>
            <p className="harga-element">Harga</p>
            <p className="qty-element">Qty</p>
            <p className="total-element">Total</p>
          </div>

          {data &&
            data.map((ele, index) => {
              return (
                <div className="container-data-print">
                  <p
                    className="no-element"
                    style={{
                      margin: "2px 0",
                    }}
                  >
                    {index + 1}.
                  </p>
                  <p
                    className="name-element"
                    style={{
                      margin: "2px 0",
                    }}
                  >
                    {ele.name}
                  </p>
                  <p
                    className="harga-element"
                    style={{
                      margin: "2px 0",
                    }}
                  >
                    Rp.{formatDot(ele.price)}
                  </p>
                  <p
                    className="qty-element"
                    style={{
                      margin: "2px 0",
                    }}
                  >
                    {formatDot(ele.qty)}
                  </p>
                  <p
                    className="total-element"
                    style={{
                      margin: "2px 0",
                    }}
                  >
                    Rp.{formatDot(ele.price * ele.qty)}
                  </p>
                </div>
              );
            })}

          <div className="wrapper-footer-print">
            <p
              style={{ lineHeight: "16px", margin: "2px 0", fontWeight: "500" }}
            >
              Total :
            </p>
            <p
              style={{
                borderBottom: "0.5px solid darkblue",
                lineHeight: "16px",
                margin: "2px 0",
                fontWeight: "500",
              }}
            >
              Rp.{formatDot(total)}
            </p>
          </div>
          <div className="wrapper-footer-print">
            <p style={{ margin: "0" }}>Pecahan Uang :</p>
            <p style={{ margin: "0" }}>Rp.{formatDot(pecahanUang)}</p>
          </div>
          <div className="wrapper-footer-print">
            <p style={{ margin: "2px 0" }}>Kembalian :</p>
            <p style={{ margin: "2px 0" }}>
              Rp.{formatDot(pecahanUang - total)}
            </p>
          </div>
        </div>
        <div ref={shadowRootHostEl} />
      </div>
    </>
  );
});
