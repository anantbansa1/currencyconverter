import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";

import Axios from "axios";

export default function App() {
  const [info, setInfo] = useState([]);
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);
  const [showFlatList, setShowFlatList] = useState(false);
  const [showFlatList2, setShowFlatList2] = useState(false);

  useEffect(() => {
    Axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
    ).then((res) => {
      setInfo(res.data[from]);
    });
  }, [from]);

  useEffect(() => {
    setOptions(Object.keys(info));
    convert();
  }, [info]);

  function convert() {
    var rate = info[to];
    setOutput(input * rate);
  }

  function flip() {
    var temp = from;
    setFrom(to);
    setOutput(temp);
  }
  const handleItemClick = (item) => {
    setFrom(item);
    setShowFlatList(false); // Close the FlatList after selecting an item
  };
  const handleItemClick2 = (item) => {
    setTo(item);
    setShowFlatList2(false); // Close the FlatList after selecting an item
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(item)}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );
  const renderItem2 = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick2(item)}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  const handleOpenFlatList = () => {
    setShowFlatList(true); // Show the FlatList
  };
  const handleOpenFlatList2 = () => {
    setShowFlatList2(true); // Show the FlatList
  };

  return (
    <View style={styles.container}>
      <View>
        {/* <View style={styles.all}> */}
        <Button title={from} onPress={handleOpenFlatList} />
        {showFlatList && (
          <FlatList
            data={options}
            renderItem={renderItem}
            keyExtractor={(item) => item}
          />
        )}
        <TextInput
          placeholder="Enter amount"
          style={styles.input}
          onChangeText={(input) => setInput(input)}
        />

        <Button title={to} onPress={handleOpenFlatList2} />
        {showFlatList2 && (
          <FlatList
            data={options}
            renderItem={renderItem2}
            keyExtractor={(item) => item}
          />
        )}

        <Button onPress={convert} title="Convert" />
        <Text style={styles.output}>{output}</Text>
        {/* </View> */}
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // margin: "3px",
  },
  output: {
    textAlign: "center",
    // margin: "3px",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    // margin: "3px",
  },
});
