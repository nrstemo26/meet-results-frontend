import { Helmet } from 'react-helmet';

export const updateMetaTags = (title, description) => {
    return (
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} key="og:title"/>
        <meta name="description" content={description} key="description"/>
        <meta property="og:description" content={description} key="og:description"/>
      </Helmet>
    );
  };
