import { PostView } from "src/sections/post";
import { Helmet } from 'react-helmet-async';
export default function AppPage() {


  return (
    <>

     <Helmet>
        <title> Products | Desilekh  </title>
      </Helmet>

    <PostView />
    </>
  );
}
