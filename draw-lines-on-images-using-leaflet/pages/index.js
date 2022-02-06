import Head from "next/head";
import dynamic from "next/dynamic";
const Map = dynamic(
  () => import("../components/Map"),
  { ssr: false } 
);

export default function Home() {



  return (
    <div style={{display: 'flex' , alignItems: 'center' , justifyContent: 'center' , width: '100vw' , height: '100vh'}}>
      <div style={{ width: 1600, height: 1000 , background: 'green' }}>
       <Map />
      </div>
    </div>
  );
}
