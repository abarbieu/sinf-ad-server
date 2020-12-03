import React, { useState } from "react";
import axios from "axios";

export default function ShowReport(props) {
   const [reportDesktop, updateReportDesktop] = useState({
      impressions: 0,
      clicks: 0,
      conversions: 0,
   });

   const [reportMobile, updateReportMobile] = useState({
      impressions: 0,
      clicks: 0,
      conversions: 0,
   });

   const reportPath = "http://localhost:8080/api/reporting/sum";

   axios
      .get(reportPath + "/2")
      .then((res) => {
         updateReportDesktop({
            impressions: res.data.summedAdsObject.impressions,
            clicks: res.data.summedAdsObject.clicks,
            conversions: res.data.summedAdsObject.conversions,
         });
      })
      .catch((err) => console.error(err));

   axios
      .get(reportPath + "/1")
      .then((res) => {
         updateReportMobile({
            impressions: res.data.summedAdsObject.impressions,
            clicks: res.data.summedAdsObject.clicks,
            conversions: res.data.summedAdsObject.conversions,
         });
      })
      .catch((err) => console.error(err));

   return (
      <div>
         <h1 style={{ margin: "20px 0 20px 10px", color: "#2B6CB3" }}>
            Statistics by Flight:
         </h1>
         <div
            style={{
               margin: "10px",
               backgroundColor: "#2B6CB3",
               padding: "10px",
               color: "#fff",
            }}
         >
            <h2>Desktop</h2>
            <p>Impressions: {reportDesktop.impressions}</p>
            <p>Clicks: {reportDesktop.clicks}</p>
            <p>Conversions: {reportDesktop.conversions}</p>
         </div>

         <div
            style={{
               margin: "10px",
               backgroundColor: "#2B6CB3",
               padding: "10px",
               color: "#fff",
            }}
         >
            <h2>Mobile</h2>
            <p>Impressions: {reportMobile.impressions}</p>
            <p>Clicks: {reportMobile.clicks}</p>
            <p>Conversions: {reportMobile.conversions}</p>
         </div>
      </div>
   );
}
