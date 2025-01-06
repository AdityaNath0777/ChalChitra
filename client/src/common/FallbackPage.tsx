const FallbackPage = () => {
  return (
    <div className="text-center p-2">
      <h1>Oops! Something went wrong.</h1>
      <p>We're working to fix this issue. Please try again later.</p>
      <button onClick={() => window.location.replace("/")}>Go to Home</button>
    </div>
  );
};

export default FallbackPage;
