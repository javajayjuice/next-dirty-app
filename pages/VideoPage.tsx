// import { useEffect, useRef, useState } from 'react';

// const VideoPage = ({  }) => {
//   const videoRef = useRef(null);
//   const [fileUrl, setFileUrl] = useState('');

//   const fileId = `ca37f77b-d36a-4f6f-6adb-08db6b92e15c`;
//   const localhost = "https://localhost:44311/api/";
//   useEffect(() => {
//     async function fetchFileUrl() {
//       try {
//         const response = await fetch(`${localhost}services/app/StoredFile/StreamVideo?fileId=${'ca37f77b-d36a-4f6f-6adb-08db6b92e15c'}`); // Replace with your server endpoint to fetch the file URL
//         // console.log(response);
//         if (!response.ok) {
//           throw new Error('Failed to fetch video URL');
//         }
//         const data = await response.json();
//         setFileUrl(data.url);
//       } catch (error) {
//         console.error(error);
//         // Handle error condition
//       }
//     }
//     fetchFileUrl();
    
//   }, [fileId]);

//   return (
//     <div>
//       {fileUrl ? (
//         <video ref={videoRef} controls>
//           <source src={fileUrl} type="video/mp4" />
//           {/* Add additional source elements for other video formats */}
//         </video>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// // export async function getServerSideProps({ params }) {
// //   return {
// //     props: {
// //       fileId: params.fileId,
// //     },
// //   };
// // }

// export default VideoPage;
