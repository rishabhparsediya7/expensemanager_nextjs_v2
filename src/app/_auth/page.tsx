import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAuth(Component: any) {
  return function Auth(props: any) {
    const router = useRouter();
    useEffect(() => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("userId");
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (!token || !user || !isLoggedIn) {
        router.push("/");
      }
    }, [router]);
    return <Component {...props} />;
  };
}
