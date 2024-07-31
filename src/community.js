import Navbar from "./components/Nav/Navbar";
import Footer from "./Footer";
import "./style.css";

const CommunityPage = () => {
  return (
    <div className="App">
      <Navbar />
      <div style={{ width: "100%", height: "84vh" }}>
        {/* Display the URL content in an iframe */}
        <iframe
          src="http://localhost:3002/"
          style={{ width: "100%", height: "100%", border: "none" }}
          title="Embedded Content"
        />
      </div>
      <Footer />
    </div>
  );
};

export default CommunityPage;
