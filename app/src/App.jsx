import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Authentication from "./pages/Authentication/Authentication";
import ChallengeProvider from "./contexts/ChallengeProvider";
import AuthContainer from "./contexts/AuthContainer";
function App() {
  return (
    <>
      <ChallengeProvider>
        <AuthContainer>
          <Header />

          {/* main = temporary */}
          <main>
            <Authentication />
          </main>

          <Footer />
        </AuthContainer>
      </ChallengeProvider>
    </>
  );
}

export default App;
