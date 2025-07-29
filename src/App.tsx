import { Route, Routes } from "react-router-dom";

import { Header } from "./react/components/layouts/Header/Header";
import { Home } from "./react/pages/Home/Home";
import { Footer } from "./react/components/layouts/Footer/Footer";

function App() {
  return (
    <div id="content" className="wrapper">
      <Header />
      <main>
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
