import React, { useEffect, useState, useRef, forwardRef } from "react";
import { formatDot } from "../../util/helperFunction";
import Barcode from "react-barcode";
import "./ComponentBarcodeToPrint.css";

export const ComponentBarcodeToPrint = forwardRef((props, ref) => {
  const { data } = props;

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
        {`@page { size: 95mm 50mm portrait;`}
      </style>
      <div ref={ref} className="relativeCSS" id="testClass">
        <div
          style={{
            width: "95mm",
            padding: "4px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {data &&
            data.map((ele) => {
              return (
                <div
                  style={{
                    marginRight: "1mm",
                    width: "30mm",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  {ele.name || ele.nama ? (
                    <Barcode
                      value={ele.kode}
                      displayValue={true}
                      width={1.2}
                      height={28}
                      text={ele.kode}
                      fontSize="9px"
                      margin={0}
                      marginTop={5}
                      renderer="svg"
                      ean128={true}
                    />
                  ) : (
                    ""
                  )}
                  <p
                    style={{
                      margin: "2px 0 4px 0",
                      fontSize: "10px",
                      textAlign: "center",
                    }}
                  >
                    {ele.price > 0 ? `Rp.${formatDot(ele.price)}` : ""}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
});
