import { LoaderCircle } from "lucide-react";
import { Spinner } from "./Loader.style";

const Loader = () => {
  return (
    <Spinner>
      <LoaderCircle width="1rem" height="1rem" />
    </Spinner>
  )
}

export default Loader;