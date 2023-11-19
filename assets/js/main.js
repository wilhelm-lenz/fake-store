"use strict";

const gallerySectionElement = document.querySelector(".section-gallery");
const searchTermInputElement = document.querySelector(".search-input");
const searchFilterSelectElement = document.querySelector(
  ".search-filter-items"
);
const categoryBtnElements = document.querySelectorAll(".categorie-btn");

let currentProducts = [];

const fetchData = (urlParam) => {
  const productsString = urlParam;

  fetch(`https://fakestoreapi.com/${productsString}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          `Status: ${response.status}! An error has occurred. Please check!`
        );
      }
    })
    .then((data) => {
      currentProducts = [...data];
      updateDisplay();
      const cards = document.querySelectorAll(".card");
      for (let i = 0; i < currentProducts.length; i++) {
        cards[i].addEventListener("click", () => {
          const paramId = currentProducts[i].id;
          window.location.href = `./assets/html/product-detail-page.html?id=${paramId}`;
        });
      }
    })
    .catch((error) => console.log(error));
};

const updateDisplay = () => {
  gallerySectionElement.innerHTML = "";
  localStorage.setItem("products", JSON.stringify(currentProducts));
  currentProducts.forEach((product) => {
    createProductCard(product);
  });
};

const createProductCard = (productParam) => {
  const product = productParam;

  const cardArticleElement = document.createElement("article");
  const cardHeaderDivElement = document.createElement("div");
  const cardImgElement = document.createElement("img");
  const cardH3Element = document.createElement("h3");
  const cardFooterDivElement = document.createElement("div");
  const cardHrElement = document.createElement("hr");
  const cardDivElement = document.createElement("div");
  const cardParagraphElement = document.createElement("p");
  const cardButtonElement = document.createElement("a");

  cardImgElement.setAttribute("src", product.image);
  cardImgElement.setAttribute("alt", product.description);
  cardH3Element.textContent = product.title;
  cardParagraphElement.textContent = "$ " + product.price;
  cardButtonElement.textContent = "Add to cart";

  cardArticleElement.classList.add("card");
  cardHeaderDivElement.classList.add("card-header-wrapper");

  cardImgElement.classList.add("card-img");
  cardH3Element.classList.add("card-headline");
  cardFooterDivElement.classList.add("card-footer-wrapper");
  cardHrElement.classList.add("card-divider");
  cardDivElement.classList.add("card-info-wrapper");
  cardParagraphElement.classList.add("card-price");
  cardButtonElement.classList.add("card-cta-btn");

  gallerySectionElement.append(cardArticleElement);
  cardHeaderDivElement.append(cardImgElement, cardH3Element);
  cardFooterDivElement.append(cardHrElement, cardDivElement);
  cardArticleElement.append(cardHeaderDivElement, cardFooterDivElement);
  cardDivElement.append(cardParagraphElement, cardButtonElement);
};

const searchItems = () => {
  if (currentProducts !== undefined) {
    searchTermInputElement.addEventListener("input", () => {
      const searchTerm = searchTermInputElement.value.toLowerCase().trim();
      gallerySectionElement.innerHTML = "";
      currentProducts.filter((product) => {
        const productTitle = product.title.toLowerCase().trim();
        if (productTitle.includes(searchTerm)) {
          createProductCard(product);
        }
      });
    });
  }
};

const sortProducts = () => {
  searchFilterSelectElement.addEventListener("change", () => {
    gallerySectionElement.innerHTML = "";

    if (searchFilterSelectElement.selectedIndex === 0) {
      currentProducts
        .sort(
          (firstProductPrice, secondProductPrice) =>
            firstProductPrice.id - secondProductPrice.id
        )
        .forEach((product) => createProductCard(product));
    } else if (searchFilterSelectElement.value === "ascending") {
      currentProducts
        .sort(
          (firstProductPrice, secondProductPrice) =>
            firstProductPrice.price - secondProductPrice.price
        )
        .forEach((product) => createProductCard(product));
    } else if (searchFilterSelectElement.value === "descending") {
      currentProducts
        .sort(
          (firstProductPrice, secondProductPrice) =>
            secondProductPrice.price - firstProductPrice.price
        )
        .forEach((product) => createProductCard(product));
    }
  });
};

const filterProducts = () => {
  let isActive;
  categoryBtnElements.forEach((categoryBtn) => {
    categoryBtn.addEventListener("click", () => {
      const btnTextContent = categoryBtn.textContent;
      if (btnTextContent === "all products" && isActive !== "all products") {
        isActive = "all products";
        fetchData("products");
      } else if (
        btnTextContent === "electronics" &&
        isActive !== "electronics"
      ) {
        isActive = "electronics";
        fetchData("products/category/electronics");
      } else if (btnTextContent === "jewelery" && isActive !== "jewelery") {
        isActive = "jewelery";
        fetchData("products/category/jewelery");
      } else if (
        btnTextContent === "men's clothing" &&
        isActive !== "men's clothing"
      ) {
        isActive = "men's clothing";
        fetchData("products/category/men's clothing");
      } else if (
        btnTextContent === "women's clothing" &&
        isActive !== "women's clothing"
      ) {
        isActive = "women's clothing";
        fetchData("products/category/women's clothing");
      }
    });
  });
};

fetchData("products");
sortProducts();
searchItems();
filterProducts();
