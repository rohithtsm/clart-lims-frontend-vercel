import React, { useEffect } from "react";
import { useCommonContext } from "../../helpers/CommonContext";
import { Link } from "react-router-dom";

const Event = () => {
  const { getEventList, eventList } = useCommonContext();

  const stripHtmlAndLimit = (html, limit = 150) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  useEffect(() => {
    if(eventList?.data?.length === 0) {
      getEventList();
    }
  }, []);

  return (
    <section className="newspart blog-page">
      <article className="container">
        <h2 className="mb-4" align="center">
          News & Events
        </h2>
        <aside className="row">
          {/* item start */}
          {Array.isArray(eventList?.data) &&
            eventList?.data.slice(0, 3).map((item, i) => (
              <div className="col-md-4" key={i}>
                <div className="blog-media item">
                  <div className="imgBx" style={{ height: "200px" }}>
                    <Link to={`/event-detail/${item?._id}`}>
                      <img
                        src={item?.primary_image}
                        height={200}
                        width={400}
                        alt={item?.title}
                      />
                    </Link>
                  </div>
                  <div className="blog-right">
                    <div className="p-3">
                      <ul className="post-social pt-2">
                        <li>
                          <i className="fa fa-map-marker"></i> Kolkata-700106
                        </li>
                        <li>
                          <i className="fa fa-calendar"></i>{" "}
                          <small>
                            {formatDate(item?.date)}
                          </small>
                        </li>
                      </ul>
                      <Link to={`/event-detail/${item?._id}`}>
                        <h4>
                          {item?.title.length > 30
                            ? `${item?.title.substring(0, 30)}...`
                            : item?.title}
                        </h4>
                      </Link>
                      <p>{stripHtmlAndLimit(item?.description)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {/* item end */}
        </aside>
      </article>
    </section>
  );
};

export default Event;
