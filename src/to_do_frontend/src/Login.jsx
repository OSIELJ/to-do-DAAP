import { useState } from 'react';
import { createActor, to_do_backend } from 'declarations/to_do_backend';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent } from '@dfinity/agent';
import { useNavigate } from 'react-router-dom';

let actorToDoBackend = to_do_backend;

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  async function login() {
    let authClient = await AuthClient.create();

    await authClient.login({
      identityProvider: 'https://identity.ic0.app/#authorize',
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        console.log(identity.getPrincipal().toText());

        const agent = new HttpAgent({ identity });

        actorToDoBackend = createActor(process.env.CANISTER_ID_TO_DO_BACKEND, {
          agent,
        });

        const principalText = await actorToDoBackend.getPrincipal?.();
        setIsLoggedIn(true);
        document.getElementById('principalText').innerText =
          principalText || identity.getPrincipal().toText();

        navigate('/tarefas/');
      },

      windowOpenerFeatures: `
        left=${window.screen.width / 2 - 525 / 2},
        top=${window.screen.height / 2 - 705 / 2},
        toolbar=0,location=0,menubar=0,width=525,height=705
      `,
    });

    return false;
  }

  async function logout() {
    const authClient = await AuthClient.create();
    await authClient.logout();
    document.getElementById('principalText').innerText = '';
    setIsLoggedIn(false);
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <div className="panel">
        {!isLoggedIn && (
          <button id="login" onClick={login}>
            Login
          </button>
        )}
        {isLoggedIn && (
          <button id="logout" onClick={logout}>
            Logout
          </button>
        )}
        <br />
        <label id="principalText"></label>
      </div>
    </main>
  );
}

export default Login;
