import React from 'react'
import whychooseUsA from "/assets/images/why-choose-us-1.jpg";
import whychooseUsB from "/assets/images/why-choose-us-2.jpg";

const WhyChooseUs = () => {
  return (
    <section className="whyChooseUs">
    <article className="container">
      <h3>
        <b>Why choose CLART as your preferred pet diagnostic partner?</b>
      </h3>
      <h5 className="mb-4"><a href="https://clart.in/" target='_blank' style={{color:'#000'}}><strong>Centre for Laboratory Animal Research and Training (CLART)</strong></a> under <a href="https://wbldc.in/" target='_blank' style={{color:'#000'}}><strong>West Bengal Livestock Development Corporation Limited (A West Bengal Govt. Undertaking)</strong></a> CLART is a 30000 sq mtr animal diagnostic laboratory and the most advanced <strong>pet diagnostic facility in eastern India</strong> with state of art equipments and managed by team of veterinarian’s, research scientists and experienced pathologist’s.</h5>

      <div className='row'>
        <div className='col-md-6'>
          <img className="img-fluid rounded-3" src={whychooseUsA} alt="" />
        </div>
        <div className='col-md-6'>
          <img className="img-fluid rounded-3" src={whychooseUsB} alt="" />
        </div>
      </div>
      
    </article>
  </section>
  )
}

export default WhyChooseUs