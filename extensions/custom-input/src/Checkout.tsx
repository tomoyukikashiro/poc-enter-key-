import {
  reactExtension,
  TextField,
  useBuyerJourneyIntercept,
  useApplyAttributeChange,
} from "@shopify/ui-extensions-react/checkout";
import { useState } from "react";

export default reactExtension("purchase.checkout.block.render", () => <App />);

function App() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const applyAttributeChange = useApplyAttributeChange();

  useBuyerJourneyIntercept(() => {
    if (value) {
      return {
        behavior: "allow",
      };
    } else {
      return {
        behavior: "block",
        reason: "required",
        perform: () => {
          setError("the value is required");
        },
      };
    }
  });

  return (
    <TextField
      label="required field"
      onChange={(value) => {
        setValue(value);
        applyAttributeChange({
          type: "updateAttribute",
          key: "test-attribute",
          value,
        });
      }}
      error={error}
      value={value}
    />
  );
}