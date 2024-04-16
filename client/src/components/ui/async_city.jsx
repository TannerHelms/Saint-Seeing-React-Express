import { useState, useRef } from "react";
import { Autocomplete, Loader } from "@mantine/core";
import RadarApi from "../../api/radarApi";

const AsyncCity = ({ form }) => {
  const timeoutRef = useRef(-1);
  const [value, setValue] = useState(form.values.city || "");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleChange = async (val) => {
    window.clearTimeout(timeoutRef.current);
    setValue(val);
    setData([]);

    if (val.trim().length === 0) {
      setLoading(false);
    } else {
      setLoading(true);

      timeoutRef.current = window.setTimeout(async () => {
        const { addresses } = await RadarApi.autoComplete(val, {
          longitude: -111.8338,
          latitude: 41.73698,
        });
        const formatted = addresses.map((a) => a.formattedAddress);
        const uniqueFormatted = [...new Set(formatted)];
        setData(uniqueFormatted);
        setLoading(false);
      }, 500);
    }
  };

  return (
    <Autocomplete
      required
      value={value}
      data={data}
      onOptionSubmit={(val) => {
        form.setFieldValue("city", val);
      }}
      onChange={handleChange}
      rightSection={loading ? <Loader size="1rem" /> : null}
      placeholder="Your City"
      classNames={{
        root: "w-full",
        input: "h-14 text-xl pl-5",
      }}
    />
  );
};
export default AsyncCity;
