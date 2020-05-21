import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function App() {
  const [val, setValue] = React.useState("");
  const [items, setItems] = React.useState([]);
  const [listItems, setList] = React.useState([]);
  const [keyState, setKey] = React.useState("");

  React.useEffect(() => {
    console.log(keyState);
    if (keyState == "add") {
      list(0);
    } else if (keyState === "all") {
      list(0);
    } else if (keyState === "done") {
      list(1);
    } else if (keyState === "active") {
      list(2);
    }
  }, [items, keyState]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: items.length,
        value: val,
        state: 0,
      },
    ]);
    setValue("");
    setKey("add");
    console.log(items);
  };

  const check = (i) => {
    let newList = items.map((item) => {
      if (item.id === i) {
        item.state = 1;
      }
      return item;
    });
    setItems(newList);
    console.log(items[i]);
  };

  const list = (key) => {
    if (key === 0) {
      setKey("all");
      setList([...items]);
    } else if (key === 1) {
      setKey("done");
      const arr1 = items.map((item) => {
        if (item.state) {
          return item;
        }
        return 0;
      });
      setList([...arr1]);
    } else {
      setKey("active");
      const arr2 = items.map((item) => {
        if (!item.state) {
          return item;
        }
        return 0;
      });
      setList([...arr2]);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={{ marginTop: 100 }}
        data={listItems}
        renderItem={({ item, index }) => {
          if (item) {
            return (
              <View style={{ flexDirection: "row", marginTop: 10 }} key={index}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    check(item.id);
                  }}
                >
                  {item.state ? (
                    <FontAwesome
                      name="check-square-o"
                      size={24}
                      color="white"
                    />
                  ) : (
                    <MaterialIcons
                      name="check-box-outline-blank"
                      size={24}
                      color="white"
                    />
                  )}
                </TouchableOpacity>
                <Text style={item.state ? styles.list2 : styles.list1}>
                  {item.value}
                </Text>
              </View>
            );
          }
        }}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.text1}>My To-Do List App</Text>
            <View style={styles.header}>
              <View style={styles.row}>
                <TextInput
                  onChangeText={(text) => setValue(text)}
                  value={val}
                  style={styles.input}
                />
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    addItem();
                  }}
                >
                  <AntDesign name="pluscircle" size={24} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <TouchableOpacity
                  style={keyState == "all" ? styles.clicked : styles.button}
                  activeOpacity={0.8}
                  onPress={() => {
                    list(0);
                  }}
                >
                  <Text style={styles.list}>ALL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={keyState == "active" ? styles.clicked : styles.button}
                  activeOpacity={0.8}
                  onPress={() => {
                    list(2);
                  }}
                >
                  <Text style={styles.list}>ACTIVE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={keyState == "done" ? styles.clicked : styles.button}
                  activeOpacity={0.8}
                  onPress={() => {
                    list(1);
                  }}
                >
                  <Text style={styles.list}>DONE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.list}>You Haven't Added Any Tasks Yet!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#569",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    width: 300,
  },
  text1: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text2: {
    color: "#fff",
    fontSize: 14,
  },
  input: {
    borderColor: "white",
    borderWidth: 1,
    margin: 5,
    flexGrow: 4,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    flexGrow: 1,
    flexBasis: 90,
    backgroundColor: "#569",
    height: 30,
    margin: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  clicked: {
    flexGrow: 1,
    flexBasis: 90,
    height: 30,
    margin: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    color: "white",
    fontSize: 20,
  },
  list1: {
    color: "white",
    fontSize: 20,
  },
  list2: {
    color: "white",
    fontSize: 20,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
});
