import { useState, useRef } from "react";
import { Autocomplete, Loader } from "@mantine/core";
import RadarApi from "../../api/radarApi";
import useUsers from "../../api/use_users";

const AsyncCity = () => {
  const timeoutRef = useRef(-1);
  const [value, setValue] = useState("");
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
        setData(addresses.map((a) => a.formattedAddress));
        setLoading(false);
      }, 500);
    }
  };
  return (
    <Autocomplete
      value={value}
      data={data}
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
