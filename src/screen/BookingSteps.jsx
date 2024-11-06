import bookAppointment from "/assets/images/book-appointment.svg";
import sampleCollection from "/assets/images/home-sample-collection.svg";
import accurateResults from "/assets/images/fast-accurate-results.svg";

const BookingSteps = () => {
  return (
    <section className="processSection">
        <article className="container">
          <div className="title4">
            <h2 className="title-inner4">
              How to book a Lab test in 3 simple steps
            </h2>
            <div className="line">
              <span></span>
            </div>
          </div>
          <div>
            <div className="process row text-center">
              <div className="col content-col">
                <div className="circle-icon-container">
                  <img src={bookAppointment} alt="" />
                </div>
                <h4>Book Appointment</h4>
                <p>
                  Select a Test/Package and book an appointment on Clart Lims
                </p>
              </div>
              <div className="col arrow-col">
                <i className="fa " />
              </div>
              <div className="col content-col">
                <div className="circle-icon-container">
                  <img src={sampleCollection} alt="" />
                </div>
                <h4>Home Sample Collection</h4>
                <p>
                  A certified Clart Lims Phlebotomist visits you for sample collection
                  at your selected time slo
                </p>
              </div>
              <div className="col arrow-col">
                <i className="fa" />
              </div>
              <div className="col content-col">
                <div className="circle-icon-container">
                  <img src={accurateResults} alt="" />
                </div>
                <h4>Fast & Accurate Results</h4>
                <p>
                  Get reports in 12-24 hrs. View and download from the app
                  anytime
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>
  )
}

export default BookingSteps