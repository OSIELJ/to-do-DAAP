import { AuthClient } from "@dfinity/auth-client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Index() {
  const navigate = useNavigate();

  async function login() {
    const authClient = await AuthClient.create();

    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: async () => {
        // Sucesso na autenticação, redireciona para tarefas
        navigate("/tarefas/");
      },
      windowOpenerFeatures: `
        left=${window.screen.width / 2 - 525 / 2},
        top=${window.screen.height / 2 - 705 / 2},
        toolbar=0,location=0,menubar=0,width=525,height=705
      `,
    });
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold">TO-DO</h1>
        <p className="mb-8 text-lg font-normal text-gray-500">
          Controle suas tarefas 100% onchain na ICP!
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center">
          <button
            onClick={login}
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
          >
            ENTRAR
          </button>
        </div>
      </div>
    </section>
  );
}

export default Index;
