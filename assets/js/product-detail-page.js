"use strict";

const products = JSON.parse(localStorage.getItem("products"));
console.log(products);

const productDetailsSectionElement = document.querySelector(
  ".section-product-details"
);

const createProductDetails = (productObj) => {
  const productArticleElement = document.createElement("article");
  const productImgElement = document.createElement("img");
  const productDetailsArticleElement = document.createElement("article");
  const productDetailsHeadlineH3Element = document.createElement("h3");
  const productDetailsRaitingPElement = document.createElement("p");
  const productDetailsDescriptionPElement = document.createElement("p");
  const productDetailsCategoryPElement = document.createElement("p");
  const productDetailsPricePElement = document.createElement("p");

  productArticleElement.classList.add("product-details-img-wrapper");
  productImgElement.classList.add("product-details-img");
  productDetailsArticleElement.classList.add("product-details-wrapper");
  productDetailsHeadlineH3Element.classList.add("product-details-headline");
  productDetailsRaitingPElement.classList.add("product-details-raiting");
  productDetailsDescriptionPElement.classList.add(
    "product-details-description"
  );
  productDetailsCategoryPElement.classList.add("product-details-category");
  productDetailsPricePElement.classList.add("product-details-price");

  let stars = "";
  for (let i = 0; i < 5; i++) {
    if (i < productObj.rating.rate) {
      stars += "⭑";
    } else {
      stars += "⭐︎";
    }
  }

  productImgElement.setAttribute("src", productObj.image);
  productImgElement.setAttribute("alt", productObj.description);
  productDetailsHeadlineH3Element.textContent = productObj.title;
  productDetailsRaitingPElement.innerHTML = `<span class="stars">${stars}</span> (${productObj.rating.rate})`;

  productDetailsDescriptionPElement.textContent = productObj.description;
  productDetailsCategoryPElement.innerHTML = `Category: <span class="category">${productObj.category}</span>`;
  productDetailsPricePElement.textContent = "$ " + productObj.price;

  productDetailsSectionElement.append(
    productArticleElement,
    productDetailsArticleElement
  );
  productArticleElement.appendChild(productImgElement);
  productDetailsArticleElement.append(
    productDetailsHeadlineH3Element,
    productDetailsRaitingPElement,
    productDetailsDescriptionPElement,
    productDetailsDescriptionPElement,
    productDetailsCategoryPElement,
    productDetailsPricePElement
  );
};

const h1 = document.querySelector("h1");

let url = new URL(window.location.href);
const searchParam = new URLSearchParams(url.search);
const searchParamValue = searchParam.get("id");

const showProduct = () => {
  products.forEach((productObj) => {
    if (productObj.id === Number(searchParamValue)) {
      createProductDetails(productObj);
    }
  });
};

showProduct();
