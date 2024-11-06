import React from "react";
import { Col, Container, Row, Card, CardBody } from "reactstrap";
import CommonLayout from "../component/shop/common-layout";
import serviceRat from "/assets/images/service-rat.jpg";


const Services = () => {
  return (
    <CommonLayout parent="home" title="Services">
      <section className="servicePage">
        <article className="container">
          <aside className="row mb-5" style={{alignItems:'center'}}>
            <div className="col-md-6">
              <h3 className="text-black fs-2"><b>Trust in Excellence</b></h3>
              <p>At <a href="https://clart.in/" style={{color:'#000'}}><strong>Centre for Laboratory Animal Research and Training (CLART)</strong></a> , Our team of experts utilizes the latest technology and techniques to deliver accurate and reliable results, ensuring the highest level of care for your pet’s health.</p>
            </div>
            <div className="col-md-6">
              <img className="img-fluid rounded" src={serviceRat} alt="" />
            </div>
          </aside>
          <aside className="row">
            {/* item start */}
            <div className="col-md-3">
              <div className="serviceItem">
                <h3>SEROLOGY</h3>
                <p>Serology focuses on studying blood serum and bodily fluids to identify antibodies and antigens. These tests are essential for diagnosing infections, immune disorders, and other conditions by detecting immune system responses.</p>
              </div>
            </div>
            {/* item end */}

            {/* item start */}
            <div className="col-md-3">
              <div className="serviceItem">
                <h3>HAEMATOLOGY</h3>
                <p>Hematology is the medical science branch studying blood, blood-forming organs, and blood diseases, including anemia, clotting disorders, leukemia, and lymphoma.</p>
              </div>
            </div>
            {/* item end */}

            {/* item start */}
            <div className="col-md-3">
              <div className="serviceItem">
                <h3>BIOCHEMISTRY</h3>
                <p>Biochemistry analyzes blood and urine to diagnose and monitor diseases by measuring chemicals, hormones, and enzymes, essential for assessing organ function and overall health.</p>
              </div>
            </div>
            {/* item end */}

            {/* item start */}
            <div className="col-md-3">
              <div className="serviceItem">
                <h3>HORMONE & VITAMIN</h3>
                <p>Focuses on the study of hormones and vitamins and their impact on the body. This field is crucial for understanding, diagnosing and managing imbalances and deficiencies to understand their impact on overall health.</p>
              </div>
            </div>
            {/* item end */}

            {/* item start */}
            <div className="col-md-3">
              <div className="serviceItem">
                <h3>HISTOPATHOLOGY & CYTOLOGY</h3>
                <p>Histopathology and Cytology are diagnostic fields that examine tissue and cell samples, while cytology analyzes individual cells to diagnose diseases like cancer and infections.</p>
              </div>
            </div>
            {/* item end */}

            {/* item start */}
            <div className="col-md-3">
              <div className="serviceItem">
                <h3>PARASITOLOGY</h3>
                <p>Parasitology is the study of parasites, including protozoa, worms, and ectoparasites, and their impact on hosts. It involves diagnosing parasitic infections and understanding their effects on health, which is crucial for managing diseases caused by parasites.</p>
              </div>
            </div>
            {/* item end */}

            {/* item start */}
            <div className="col-md-3">
              <div className="serviceItem">
                <h3>MICROBIOLOGY</h3>
                <p>Microbiology is the study of microorganisms such as bacteria, viruses, fungi, and parasites. It involves identifying and analyzing these microbes to diagnose infections, understand their role in diseases, and develop treatments.</p>
              </div>
            </div>
            {/* item end */}

            {/* item start */}
            <div className="col-md-3">
              <div className="serviceItem">
                <h3>PCR & RT-QPCR</h3>
                <p>PCR amplifies DNA sequences for analysis, while RT-qPCR quantifies RNA levels, crucial for gene expression studies and diagnosing infections. Both are key tools in research and diagnostics.</p>
              </div>
            </div>
            {/* item end */}
          </aside>
        </article>
      </section>
    </CommonLayout>
  );
};

export default Services;
