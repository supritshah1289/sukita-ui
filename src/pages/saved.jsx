import { Helmet } from 'react-helmet-async';

import { SavedView } from 'src/sections/saved/view';

// ----------------------------------------------------------------------

export default function SavedPage() {
  return (
    <>
      <Helmet>
        <title> My Saved List </title>
      </Helmet>

      <SavedView />
    </>
  );
}
