"use client";
import Loader from "@/components/Loader";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

// Firebase Config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

type UserProps = {
  name: string;
  photoUrl: string;
  userId: string;
  loggedIn: boolean;
  token: string;
};

interface AuthContextProps {
  googleSignIn: () => void;
  logOut: () => void;
  signInWithPassword: (params: {
    email: string;
    password: string;
  }) => Promise<any>;
  signupWithPassword: (params: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }) => Promise<void>;
  user: UserProps;
  loading: boolean;
  error: string;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps>({
    name: "",
    photoUrl: "",
    userId: "",
    loggedIn: false,
    token: "",
  });
  const [error, setError] = useState<string>("");

  const googleSignIn = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken || "";
        const user = result.user;
        const { email, uid, displayName, photoURL } = user;

        try {
          const response = await fetch(`/api/auth?email=${email}&guid=${uid}`);
          const result = await response.json();

          if (!result.ok) {
            const signupResponse = await fetch("/api/auth", {
              method: "POST",
              body: JSON.stringify({ name: displayName, email, uid }),
              headers: { "Content-Type": "application/json" },
            });

            const signupResult = await signupResponse.json();
            if (!signupResult.ok) {
              throw new Error("Could not save the user!");
            }
          }

          setUser({
            name: displayName || "",
            photoUrl: photoURL || "",
            userId: uid,
            loggedIn: true,
            token,
          });

          router.push("/home");
        } catch (err) {
          console.error(err);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const signInWithPassword = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const result = await response.json();
      const { userId, token } = result;
      if (result.success) {
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", true.toString());
        localStorage.setItem("name", result?.name);
        localStorage.setItem("photoUrl", result?.photoUrl || "");
        setUser({
          userId: result?.userId || "",
          name: result?.name || "",
          photoUrl: result?.photoUrl || "",
          token: result?.token || "",
          loggedIn: true,
        });
        return result;
      } else {
        setError(result.message);
        return result;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const signupWithPassword = async ({
    email,
    password,
    first_name,
    last_name,
  }: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify({ email, password, first_name, last_name }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log("🚀 ~ signupWithPassword ~ result:", result);
      if (result.success) {
        localStorage.setItem("userId", result.userId);
        localStorage.setItem("token", result.token);
        localStorage.setItem("isLoggedIn", true.toString());
        setUser({
          userId: result?.userId || "",
          name: first_name + " " + last_name || "",
          photoUrl: result?.photoUrl || "",
          token: result?.token || "",
          loggedIn: true,
        });
        router.push("/home");
      } else {
        throw new Error("Could not sign up with password!");
      }
    } catch (error) {
      console.log("🚀 ~ signupWithPassword ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  const logOut = useCallback(() => {
    localStorage.clear();
    setUser({
      name: "",
      photoUrl: "",
      userId: "",
      loggedIn: false,
      token: "",
    });
    router.push("/");
  }, []);

  // useEffect(() => {
  //   const userId = localStorage.getItem("userId");
  //   console.log("🚀 ~ useEffect ~ userId:", userId);
  //   const token = localStorage.getItem("token");
  //   const isLoggedIn = localStorage.getItem("isLoggedIn");

  //   const getUser = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`
  //       );
  //       const result = await response.json();
  //       if (result.success) {
  //         localStorage.setItem("name", result?.user?.name);
  //         setUser({
  //           name: result?.user?.name,
  //           photoUrl: result?.user?.profile_picture || "",
  //           userId: result?.userId,
  //           loggedIn: isLoggedIn === "true",
  //           token: token || "",
  //         });
  //       } else {
  //         throw new Error("Could not get user!");
  //       }
  //     } catch (error) {
  //       console.log("🚀 ~ getUser ~ error:", error);
  //       setUser({
  //         name: "",
  //         photoUrl: "",
  //         userId: "",
  //         loggedIn: false,
  //         token: "",
  //       });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   // Set initial loading state
  //   setLoading(true);

  //   if (!userId || !token || isLoggedIn !== "true") {
  //     setUser({
  //       name: "",
  //       photoUrl: "",
  //       userId: "",
  //       loggedIn: false,
  //       token: "",
  //     });
  //     setLoading(false);
  //   } else {
  //     getUser();
  //   }
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        googleSignIn,
        logOut,
        signInWithPassword,
        signupWithPassword,
        user,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

export { AuthContextProvider, useAuth };
