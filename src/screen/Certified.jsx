import React from "react";
import safetyQuality from "/assets/images/safety-quality.svg";
import safetyQuality1 from "/assets/images/safety-quality-1.jpg";
import safetyQuality2 from "/assets/images/safety-quality-2.jpg";
import safetyQuality3 from "/assets/images/safety-quality-3.jpg";

const Certified = () => {
  return (
    <section className="container p-0">
      <article className="certifiedBx">
        <aside className="row" style={{ alignItems: "center" }}>
          <div className="col-md-4">
            <div className="d-flex" style={{ alignItems: "center" }}>
              <div>
                <img src={safetyQuality} alt="" width={64} />
              </div>
              <div style={{ paddingLeft: "5px" }}>
                <h4 className="text-dark mb-0">
                  <b>Certified safety and quality fulfilled by Clart Lims</b>
                </h4>
              </div>
            </div>
          </div>
          <div className="col-md-8" align="center">
            {/* <img src={safetyQuality1} alt="" />
            <img src={safetyQuality2} alt="" />
            <img src={safetyQuality3} alt="" /> */}
          </div>
        </aside>
      </article>
    </section>
  );
};

export default Certified;
