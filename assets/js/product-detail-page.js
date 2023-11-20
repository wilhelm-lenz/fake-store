"use strict";

const products = JSON.parse(localStorage.getItem("products"));
let url = new URL(window.location.href);
const searchParam = new URLSearchParams(url.search);
const searchParamValue = searchParam.get("id");

const burgerMenuIcon = document.querySelector(".burger-menu");
const navigationSidebar = document.querySelector(".navigation");
const productDetailsSectionElement = document.querySelector(
  ".section-product-details"
);
const cartIconImgElement = document.querySelector(".cart-icon");
const cartIconWrapperDivElement = document.querySelector(".menu-icon-wrapper");

let stars = "";
let countItemNumberInCart = 0;
let isNavOpen = false;

const createProductDetails = (productObj) => {
  const productArticleElement = document.createElement("article");
  const productImgElement = document.createElement("img");
  const productDetailsArticleElement = document.createElement("article");
  const productDetailsHeadlineH3Element = document.createElement("h3");
  const productDetailsRaitingPElement = document.createElement("p");
  const productDetailsDescriptionPElement = document.createElement("p");
  const productDetailsCategoryPElement = document.createElement("p");
  const productDetailsPricePElement = document.createElement("p");
  const productDetailsAddToCartBtnElement = document.createElement("button");

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
  productDetailsAddToCartBtnElement.classList.add(
    "product-details-add-to-cart-btn"
  );

  createRatingStars(productObj);

  productImgElement.setAttribute("src", productObj.image);
  productImgElement.setAttribute("alt", productObj.description);
  productDetailsHeadlineH3Element.textContent = productObj.title;
  productDetailsRaitingPElement.innerHTML = `<span class="stars">${stars}</span> (${productObj.rating.rate})`;

  productDetailsDescriptionPElement.textContent = productObj.description;
  productDetailsCategoryPElement.innerHTML = `Category: <span class="category">${productObj.category}</span>`;
  productDetailsPricePElement.innerHTML = `$ <span class="price">${productObj.price}</span>`;
  productDetailsAddToCartBtnElement.textContent = "Add to cart";

  createCartNumberOfItems(productDetailsAddToCartBtnElement);

  productDetailsSectionElement.append(
    productArticleElement,
    productDetailsArticleElement
  );
  productArticleElement.appendChild(productImgElement);
  productDetailsArticleElement.append(
    productDetailsHeadlineH3Element,
    productDetailsRaitingPElement,
    productDetailsDescriptionPElement,
    productDetailsCategoryPElement,
    productDetailsPricePElement,
    productDetailsAddToCartBtnElement
  );
};

const createRatingStars = (productParam) => {
  const product = productParam;
  for (let i = 0; i < 5; i++) {
    if (i < product.rating.rate) {
      stars += "⭑";
    } else {
      stars += "⭐︎";
    }
  }
};

const createCartNumberOfItems = (productDetailsAddToCartBtnElementParam) => {
  const productDetailsAddToCartBtnElement =
    productDetailsAddToCartBtnElementParam;
  productDetailsAddToCartBtnElement.addEventListener("click", () => {
    const cartItemNumber = document.createElement("span");
    cartItemNumber.classList.add("item-number");
    countItemNumberInCart++;
    cartItemNumber.textContent = countItemNumberInCart;
    cartIconWrapperDivElement.appendChild(cartItemNumber);
  });
};

const showNavigationMenu = () => {
  burgerMenuIcon.addEventListener("click", () => {
    if (!isNavOpen) {
      navigationSidebar.style.left = 0;
      burgerMenuIcon.style.paddingLeft = "8rem";
    } else {
      navigationSidebar.style.left = "-100%";
      burgerMenuIcon.style.paddingLeft = "0";
    }
    isNavOpen = !isNavOpen;
  });
};

const showProduct = () => {
  products.forEach((productObj) => {
    if (productObj.id === Number(searchParamValue)) {
      createProductDetails(productObj);
    }
  });
};

showProduct();
