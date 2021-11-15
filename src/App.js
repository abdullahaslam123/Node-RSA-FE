
import './App.css';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as NodeRSA from "node-rsa"
require('dotenv').config()

function handleSubmit(event) {
   console.log("My Public Key:",process.env.REACT_APP_PUBLIC_KEY)
  event.preventDefault();
  console.log(event.target.password.value); 
  const message=event.target.password.value;
  var key = new NodeRSA();
  console.log("ENV VAR",process.env)
 key.setOptions({
  encryptionScheme: "pkcs1",
 });
key.importKey(process.env.REACT_APP_PUBLIC_KEY, "pkcs8-public");
const encrypted = key.encrypt(message, "base64");
console.log("Encrypted: ", encrypted);

var key2 = new NodeRSA();

  key2.setOptions({
    encryptionScheme: "pkcs1",
  });

  key2.importKey(process.env.REACT_APP_PRIVATE_KEY);
  const decrypted = key2.decrypt(encrypted, "utf8");
  console.log("Decrypted: ", decrypted);


}



function App() {
  return (
   <Box
      component="form" onSubmit={handleSubmit}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    ><div>
      <h1>RSA FE Implementation</h1>
    </div>
      <div>
        <TextField id="outlined-password-input" label="Password" type="text" name="password" />
      </div>
      <div>
      <Button variant="contained" type="submit">Signup</Button>
      </div>
    </Box>
  );
}

export default App;
