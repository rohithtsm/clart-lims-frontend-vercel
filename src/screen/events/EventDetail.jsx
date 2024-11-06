import { useParams } from "react-router-dom";
import { useCommonContext } from "../../helpers/CommonContext";
import { useEffect } from "react";
import CommonLayout from "../../component/shop/common-layout";

const EventDetail = () => {
  const { getEventDetail, eventDetail } = useCommonContext();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      // getEventDetail(params.id);
    }
  }, [params.id]);
  console.log(eventDetail)

  const { title, description, date, location, gallery_images, primary_image } =
    eventDetail?.data || {};

  return (
    <CommonLayout parent="home" title="Event-Detail">
      <div className="event-detail-container">
        {eventDetail.loading ? (
          <div className="spinner-container">
            <div className="spinner-grow text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Event Image */}
            {primary_image && (
              <div className="event-image">
                <img
                  src={primary_image}
                  alt={title}
                />
              </div>
            )}
            {/* Event Title */}
            <h2 className="event-title">{title}</h2>

            {/* Event Date & Location */}
            <div className="event-info">
              <p><strong>Date:</strong> {new Date(date).toLocaleDateString("en-GB")}</p>
              <p><strong>Location:</strong> {location}</p>
            </div>

            {/* Event Description */}
            <div className="event-description">
              <h4>Description</h4>
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>

            {/* Gallery Section */}
            {gallery_images?.length > 0 && (
              <div className="gallery-section">
                <h4>Gallery</h4>
                <div className="gallery-grid">
                  {gallery_images.map((image, index) => (
                    <div key={index} className="gallery-item">
                      <img src={image} alt={`Gallery Image ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </CommonLayout>
  );
};

export default EventDetail;