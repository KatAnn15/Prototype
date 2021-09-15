export interface ElementsList {
  listItems: {
    group: string,
    backgroundColor: string,
    title: string,
    items: 
      Item["item"][]
  }[]
}

export interface Item {
  item: {
    key: string,
    class: string,
    id: string,
    style: {
      backgroundColor: string,
      width: string,
      height: string,          
      cursor: string,
      color: string,
      borderWidth: string,
      borderColor: string,
      borderRadius: string,
      borderStyle: string
    },
    content: string,
    offsetTop: number,
    offsetLeft: number,
    count: number
  }
}
export const elementsList: ElementsList['listItems'] = [
  {
    group: "div",
    backgroundColor: "#fe02e0",
    title: "Boxes",
    items: [
      {
        key: "div",
        class: "element-child box-element",
        id: "redDiv",
        style: {
          backgroundColor: "#ff0000",
          width: "150px",
          height: "60px",          
          cursor: "pointer",
          borderWidth: "1px",
          borderColor: "#ffffff",
          color: "#ffffff",
          borderRadius: "0",
          borderStyle: "solid"
        },
        content: "",
        offsetTop: 0,
        offsetLeft: 0,
        count: 1
      },
      {
        key: "div",
        class: "element-child box-element",
        id: "yellowDiv",
        style: {
          backgroundColor: "#f8ed04",
          width: "150px",
          height: "60px",          
          cursor: "pointer",
          borderWidth: "0",
          borderColor: "#ffffff",
          color: "#ffffff",
          borderRadius: "0",
          borderStyle: "none"
        },
        content: "",
        offsetTop: 200,
        offsetLeft: 200,
        count: 1
      },
    ],
  },
  {
    group: "button",
    backgroundColor: "#000000",
    title: "Buttons",
    items: [
      {
        key: "button",
        class: "element-child button-element",
        id: "blueButton",
        style: {
          backgroundColor: "blue",
          width: "100px",
          height: "50px",
          cursor: "pointer",
          borderWidth: "1px",
          borderColor: "#ffffff",
          borderRadius: "15px",
          borderStyle: "none",
          color: "#ffffff"
        },
        content: "Hello World!",
        offsetTop: 200,
        offsetLeft: 200,
        count: 1
    }, 
    {
      key: "button",
      class: "element-child button-element",
      id: "fuchsiaButton",
      style: {
        backgroundColor: "#e10a9d",
        width: "100px",
        height: "50px",
        cursor: "pointer",
        borderWidth: "0",
        borderColor: "#ffffff",
        borderRadius: "5px",
        color: "#ffffff",
        borderStyle: "none"
      },
      content: "Contact Us!",
      offsetTop: 200,
      offsetLeft: 200,
      count: 1
  }],
  }
];
