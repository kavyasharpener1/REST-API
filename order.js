let Add = document.getElementById("add");
let Form = document.getElementById("myform");

Form.addEventListener("submit", AddItem);
function AddItem(e) {
  e.preventDefault();
  let Price = document.getElementById("price").value;
  let Table = document.getElementById("table").value;
  let Dish = document.getElementById("dish").value;
  let payload = { Price: Price, Dish: Dish, Table: Table };
  let Stringpayload = JSON.stringify(payload);
  axios
    .post(
      "https://crudcrud.com/api/1d10456779b44edf97bca0c8bdc98937/Order",
      payload
    )
    .then(() => {
      alert("Order Added Successfully");
      location.reload()
    })
    .catch((err) => {
      console.log(err);
    });
}

function showOnPage() {
  axios
    .get("https://crudcrud.com/api/1d10456779b44edf97bca0c8bdc98937/Order")
    .then((res) => {
      let Data = res.data; //array of objects
      for (var i = 0; i < Data.length; i++) {
        let id = Data[i]._id;
        let table = Data[i].Table;
        let dish = Data[i].Dish;
        let price = Data[i].Price;
        let ol = document.getElementById(table);
        let li = document.createElement("li");
        let payload = JSON.stringify({ Dish: dish, Price: price });
        li.appendChild(document.createTextNode(payload));
        let deletebutton = document.createElement("button");
        deletebutton.setAttribute("type", "button");
        deletebutton.setAttribute("id", id);
        deletebutton.appendChild(document.createTextNode("Remove"));
        deletebutton.addEventListener("click", deleteOrder);
        function deleteOrder() {
            axios.delete(`https://crudcrud.com/api/1d10456779b44edf97bca0c8bdc98937/Order/${this.id}`)
          alert("order deleted");
          location.reload()
        }
        li.appendChild(deletebutton);
        ol.appendChild(li);
      }
    });
}

showOnPage();
