import fullBodyCheckup from "/assets/images/checkup.png";

const Reasearch = () => {
  return (
    <section className="aboutPart">
      <article className="container">
        <aside className="row">
          <div className="col-md-5">
            <img src={fullBodyCheckup} alt="" />
          </div>
          <div className="col-md-7">
            <h4>Welcom To Clart!</h4>
            <h2>Trust in Excellence</h2>
            <p>
              At Centre for Laboratory Animal Research and Training (CLART) ,
              Our team of experts utilizes the latest technology and techniques
              to deliver accurate and reliable results, ensuring the highest
              level of care for your pet’s health.
            </p>
            <p>
              All the laboratory animals of CLART are being used for
              experimentation in different aspects of physiology, pathology,
              immunology, oncology and neuroscience, which are monitored by
              specially designed software and digital identification system.
            </p>
            <a className="btn btn-solid btn btn-secondary" href="#.">
              View More
            </a>
          </div>
        </aside>
      </article>
    </section>
  );
};

export default Reasearch;
