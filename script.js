document.addEventListener("DOMContentLoaded", function () {
  (function multipagedForm() {
    let currentPage = 0;

    const formPagesData = [
      {
        title: "Personal info",
        description:
          "Please provide your name, email address, and phone number.",
        fields: [
          { id: "name", type: "text", label: "Name" },
          { id: "email", type: "email", label: "E-mail" },
          { id: "phoneNumber", type: "tel", label: "Phone Number" },
        ],
      },
      {
        title: "Select your plan",
        description: "You have the option of monthly or yearly billing.",
        plans: {
          Arcade: {
            monthly: 9,
            yearly: 90,
            icon: "Static/images/icon-arcade.svg",
          },
          Advance: {
            monthly: 12,
            yearly: 120,
            icon: "Static/images/icon-advanced.svg",
          },
          Pro: { monthly: 15, yearly: 150, icon: "Static/images/icon-pro.svg" },
        },
      },
      {
        title: "Pick add-ons",
        description: "Add-ons help enhance your gaming experience.",
        addons: [
          { name: "Online Service", monthly: 1, yearly: 10 },
          { name: "Large Storage", monthly: 2, yearly: 20 },
          { name: "Customizable Profile", monthly: 2, yearly: 20 },
        ],
      },
      {
        title: "Finishing up",
        description: "Double-check everything looks OK before confirming.",
        addons: [
          { name: "Online Service", monthly: 1, yearly: 10 },
          { name: "Large Storage", monthly: 2, yearly: 20 },
          { name: "Customizable Profile", monthly: 2, yearly: 20 },
        ],
      },
      { title: "thankyou" },
    ];

    //========================== Storing the User input Data ========================
    const userInputData = {
      name: "",
      email: "",
      phone: "",
      plan: "",
      planPrice: "",
      billing: "",
      addOns: {
        "Online Service": false,
        "Large Storage": false,
        "Customizable Profile": false,
      },
    };

    function updateUserInputData(data) {
      Object.keys(data).forEach((key) => {
        userInputData[key] = data[key];
      });
    }

    // Function to validate user input in Personal details form:

    function isValidEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(email);
    }

    function isValidPhoneNumber(phoneNumber) {
      const phonePattern = /^\+91-[0-9]{10}$/;
      return phonePattern.test(phoneNumber);
    }

    function validatePersonalDetails() {
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("exampleInputEmail1");
      const phoneNumberInput = document.getElementById("exampleInputPassword1");
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phoneNumber = phoneNumberInput.value.trim();

      if (name === "" || email === "" || phoneNumber === "") {
        alert("Please fill in all required fields.");
        return false;
      } else if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
      } else if (!isValidPhoneNumber(phoneNumber)) {
        alert("Please enter a valid phone number.");
        return false;
      } else {
        console.log(name);

        const personalDetails = {
          name,
          phone: phoneNumber,
          email,
        };

        updateUserInputData(personalDetails);

        console.log(userInputData);
        return true;
      }
    }

    // Functrion to highlight the progress bar
    function highlightProgressBar(currentPage) {
      const progressItems = document.querySelectorAll(".step-num");
      progressItems.forEach((item, index) => {
        if (index === currentPage) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    }

    // Function to show pages
    function showPage(currentPage) {
      const allForms = document.querySelectorAll(".forms");
      const heading = document.getElementById("page-heading");
      const description = document.getElementById("page-description");
      const buttonsDiv = document.querySelector(".buttons");
      heading.classList.remove("d-none");
      description.classList.remove("d-none");
      buttonsDiv.classList.remove("d-none");
      heading.innerHTML = formPagesData[currentPage].title;
      description.innerHTML = formPagesData[currentPage].description;

      allForms.forEach((form, formNumber) => {
        if (formNumber === currentPage) {
          form.classList.remove("d-none");
          if (currentPage === 0) {
            prevButton.style.display = "none";
          } else if (currentPage === 1) {
            togglePrices();
            updatePlansLogo();
          } else if (currentPage === 2) {
            addOnPrices();
          } else if (currentPage === 3) {
            const nxtBtn = document.getElementById("next-button");
            nxtBtn.innerHTML = "Confirm";
            finishingUp();
          }
        } else {
          form.classList.add("d-none");
        }
      });
      if (currentPage === 4) {
        heading.classList.add("d-none");
        description.classList.add("d-none");
        buttonsDiv.classList.add("d-none");
        highlightProgressBar(3);
      } else {
        highlightProgressBar(currentPage);
      }
    }
    // Function to handle the next button click
    function handleNextButtonClick() {
      if (currentPage === 0) {
        if (!validatePersonalDetails()) {
          return;
        }
      } else if (currentPage === 1) {
        const selectedPlan = document.querySelector(".plan-option.selected");
        if (!selectedPlan) {
          alert("Please select a plan before proceeding.");
          return;
        }
      }

      if (currentPage < formPagesData.length - 1) {
        currentPage++;
        showPage(currentPage);
      }
    }

    const prevButton = document.getElementById("prev-button");
    // Function to handle the previous button click
    function handlePrevButtonClick() {
      if (currentPage > 0) {
        currentPage--;
        if (currentPage === 2) {
          togglePrices();
        }
        showPage(currentPage);
      }
    }
    // Function for inserting plans logo
    function updatePlansLogo() {
      console.log("printing from logos");
      const arcadeLogo = document.getElementById("arcade-logo");
      arcadeLogo.src = formPagesData[1]["plans"]["Arcade"].icon;
      const advanceLogo = document.getElementById("advance-logo");
      advanceLogo.src = formPagesData[1]["plans"]["Advance"].icon;
      const proLogo = document.getElementById("pro-logo");
      proLogo.src = formPagesData[1]["plans"]["Pro"].icon;
      prevButton.style.display = "block";
    }

    function updatePlan(clickedElement) {
      const allPlansContainer = document.querySelector(".all-plans");
      const planId = clickedElement.id;
      userInputData.plan = planId;
      const billingType = userInputData.billing;
      const planPrice = formPagesData[1]["plans"][planId][billingType];
      const planOptions = allPlansContainer.querySelectorAll(".plan-option");
      planOptions.forEach((plan) => {
        if (plan.id === planId) {
          plan.classList.add("selected");
        } else {
          plan.classList.remove("selected");
        }
      });
      console.log(userInputData);
      const billingDuration = userInputData.billing;
      userInputData["plan"] = planId;
      userInputData["planPrice"] =
        formPagesData[1]["plans"][planId][billingDuration];
      console.log(userInputData);
    }

    // Function to update user input data into Finishing up:

    function finishingUp() {
      const planSelected = document.getElementById("plan-selected");
      const addOnsContainer = document.getElementById("add-ons-selected");
      const totalHeader = document.querySelector(".total-header");
      const totalSum = document.querySelector(".total-sum");

      addOnsContainer.innerHTML = "";

      if ((userInputData.billing = "monthly")) {
      }

      const planPrice = document.getElementById("price");
      if (userInputData.billing === "yearly") {
        planSelected.innerHTML = `${userInputData.plan}(Yearly)`;
        planPrice.innerHTML = `$${userInputData.planPrice}/yr`;
        totalHeader.innerHTML = "Total(per month)";
      } else {
        planSelected.innerHTML = `${userInputData.plan}(Monthly)`;
        planPrice.innerHTML = `$${userInputData.planPrice}/mo`;
        totalHeader.innerHTML = "Total(per year)";
      }
      const allAddOns = userInputData.addOns;
      let totalBillPrice = userInputData.planPrice;
      for (let addOn in allAddOns) {
        if (allAddOns[addOn] === true) {
          const addOnRow = document.createElement("div");
          addOnRow.classList.add("row", "g-0");
          const addOnName = document.createElement("p");
          addOnName.classList.add("col-6", "text-start", "clr-grey");
          const addOnPrice = document.createElement("p");
          addOnPrice.classList.add("col-6", "text-end");
          addOnName.innerHTML = addOn;
          formPagesData[2].addons.forEach((value) => {
            console.log(value);
            if (value.name === addOn) {
              if ((userInputData.billing = "yearly")) {
                addOnPrice.innerHTML = `+$${value.yearly}/yr`;
                totalBillPrice += value.yearly;
                totalSum.innerHTML = `${totalBillPrice}/yr`;
              } else {
                addOnPrice.innerHTML = `+$${value.monthly}/mo`;
                totalBillPrice += value.monthly;
                totalSum.innerHTML = `${totalBillPrice}/mo`;
              }
            }
          });
          // totalSum.innerHTML = totalBillPrice;
          addOnRow.append(addOnName, addOnPrice);
          addOnsContainer.appendChild(addOnRow);
          console.log(totalBillPrice);
        }
      }
    }

    document
      .getElementById("change-page-button")
      .addEventListener("click", function () {
        currentPage = 1;
        showPage(1);
      });

    const buttonContainer = document.querySelector("main");
    buttonContainer.addEventListener("click", (event) => {
      const target = event.target;
      // console.log();
      console.log("Here witihn buttons");
      if (target.id === "next-button") {
        handleNextButtonClick();
      } else if (target.id == "prev-button") {
        handlePrevButtonClick();
      } else if (target.classList.contains("plan-option-clicked")) {
        console.log(target.closest(".plan-option"));
        const selectedPlan = target.closest(".plan-option");
        updatePlan(selectedPlan);
      }
    });

    // Function to retreive add-ons selected:
    function updateAddOnChoices(e) {
      console.log(`here`);
      const target = e.target;
      if (target.type === "checkbox") {
        if (target.checked) {
          target.parentNode.parentNode.classList.add("selected");

          if (target.id === "onlineServiceCheckbox") {
            userInputData["addOns"]["Online Service"] = true;
          } else if (target.id === "largeStorageCheckbox") {
            userInputData["addOns"]["Large Storage"] = true;
          } else if (target.id === "customizableProfileCheckbox") {
            userInputData["addOns"]["Customizable Profile"] = true;
          }
        } else {
          target.parentNode.parentNode.classList.remove("selected");

          console.log(`unchecked`);

          if (target.id === "onlineServiceCheckbox") {
            userInputData["addOns"]["Online Service"] = false;
          } else if (target.id === "largeStorageCheckbox") {
            userInputData["addOns"]["Large Storage"] = false;
          } else if (target.id === "customizableProfileCheckbox") {
            userInputData["addOns"]["Customizable Profile"] = false;
          }
        }
        console.log(userInputData);
      }
    }
    const addOns = document.getElementById("add-ons");
    addOns.addEventListener("change", (e) => {
      updateAddOnChoices(e);
    });

    // Function to toggle between monthly and yearly prices
    function togglePrices() {
      const yearlyToggle = document.getElementById("flexSwitchCheckChecked");
      const arcadePrice = document.getElementById("arcade-price");
      const advancePrice = document.getElementById("advance-price");
      const proPrice = document.getElementById("pro-price");

      console.log(yearlyToggle.checked);
      if (yearlyToggle.checked) {
        arcadePrice.innerHTML = `$${formPagesData[1].plans["Arcade"].yearly}/yr`;
        advancePrice.innerHTML = `$${formPagesData[1].plans["Advance"].yearly}/yr`;
        proPrice.innerHTML = `$${formPagesData[1].plans["Pro"].yearly}/yr`;
        updateUserInputData({ billing: "yearly" });
      } else {
        arcadePrice.innerHTML = `$${formPagesData[1].plans["Arcade"].monthly}/mo`;
        advancePrice.innerHTML = `$${formPagesData[1].plans["Advance"].monthly}/mo`;
        proPrice.innerHTML = `$${formPagesData[1].plans["Pro"].monthly}/mo`;
        updateUserInputData({ billing: "monthly" });
      }
    }
    const yearlyToggle = document.getElementById("flexSwitchCheckChecked");
    yearlyToggle.addEventListener("change", togglePrices);
    // togglePrices();

    // For changine add on prices based on toggle:
    function addOnPrices() {
      const yearlyToggle = document.getElementById("flexSwitchCheckChecked");
      const onlineServicePrice = document.getElementById("onlineServicePrice");
      const localStoragePrice = document.getElementById("localStoragePrice");
      const customizableProfilePrice = document.getElementById(
        "customizableProfilePrice"
      );
      if (yearlyToggle.checked) {
        onlineServicePrice.innerHTML = "+$10/yr";
        localStoragePrice.innerHTML = "+$20/yr";
        customizableProfilePrice.innerHTML = "+$20/yr";
      } else {
        onlineServicePrice.innerHTML = "+$1/mo";
        localStoragePrice.innerHTML = "+$2/mo";
        customizableProfilePrice.innerHTML = "+$2/mo";
      }
    }
    showPage(currentPage);
  })();
});
