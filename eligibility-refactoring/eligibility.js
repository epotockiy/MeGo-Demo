function setAnnualIncome(inputName, multiplier) {
    this.getAnnualIncome = function () {
        return Math.max($("input[name*=" + inputName + "]").val() * (multiplier || 1), 0);
    };
}

function setCalculatedAnnualIncome(inputName, multiplier) {
  this.getAnnualIncome = function () {
    var annualIncome = 0;

    $("input[name*=" + inputName + "]").each(function (index, item) {
      annualIncome += $(item).val() * (multiplier || 1);
    });

    return Math.max(annualIncome, 0);
  };
}

function IncomeTax() {
    setAnnualIncome("AnnualIncome");
}

function IncomeTax1040A() {
    setAnnualIncome("AnnualIncome");
}

function IncomeTax1099() {
    setAnnualIncome("AnnualIncome");
}

function IncomeTaxW2() {
    setAnnualIncome("AnnualIncome");
}

function IncomeTax1040EZ() {
    setAnnualIncome("AnnualIncome");
}

function SocialSecurityStatementOfBenefits() {
    setAnnualIncome("AnnualIncome");
}

function VeteransAdministrationStatementOfBenefits() {
    setAnnualIncome("MonthlyIncome", 12);
}

function RetirementPensionStatementOfBenefits() {
    setAnnualIncome("MonthlyIncome", 12);
}

function SocialSecurityStatementOfBenefitsMonthlyAwardLetter() {
    setAnnualIncome("MonthlyIncome", 12);
}

function SocialSecurityStatementOfBenefitsAnnual1099SSA() {
    setAnnualIncome("AnnualIncome");
}

function UnemploymentOrWorkersCompensationStatementOfBenefits() {
    setAnnualIncome("WeeklyIncome", 52);
}

function DivorceDecree() {
    setAnnualIncome("MonthlyIncome", 12);
}

function FederalOrTribalNoticeLetterOfParticipationInGeneralAssistance() {
    setCalculatedAnnualIncome("PayWage", 4);
}

function PayStubs() {
    setCalculatedAnnualIncome("PayWage", 4);
}

function initDatePicker(input) {
    input.datepicker({ maxDate: "+0m", minDate: "-3m", dateFormat: "mm/dd/yy" });
}

function hideAndResetDshs() {
    $(".dshs-field").hide();
    $("input[name$=Dshs]").val("");
}

function hideAndResetIncomeSection() {
    $(".income-section").hide();

    $(".individualsCount").val("");

    hideAndResetIncomeFields();
}

function hideAndResetIncomeFields() {

    $(".income-fields").hide();

    $(".proofType").prop("checked", false);

    hideAndResetAdditionalFields();
    hideAndResetProofs();
}

function hideAndResetAdditionalFields() {
    $(".additional-income-fields").hide();

    $("input[name*=IndividualsUnder18]").val("");
    $("input[name*=IndividualsReceiveIncome]").val("");
}

function hideAndResetProofs() {
    $("[data-proof]").hide();
    $(".incomeTaxType").prop("checked", false);
    $(".income-tax-samples .sample, .incomeCalculatorsBlock").hide();
    $(".pay-stub-list .pay-stub").remove();
    $(".money input").val("");

    $(".annual-income").text(cgm.formatMoney(0));

    $(".next.button").removeAttr("disabled");
}

$(function () {
    if (cgm.eligibility.isOrderAwaitingProof === "True") {
        $("input[type=text],input[type=radio],select,input[type=checkbox],.add-pay-stub,.remove-pay-stub").attr("disabled", "disabled");
    }
});

function Init() {
    /* Fields */

    var currentProof = null;
    var $maxCalculatedIncome = $(".max-calculated-income");

    /* Initialization */

    var selectedProof = $("input[name*=ProofType]:checked");
    if (selectedProof.length > 0) {
        if (selectedProof.val() === "SocialSecurityStatementOfBenefits" || selectedProof.val() === "IncomeTax") {
            selectedProof = $("[data-proof=" + selectedProof.val() + "] input:checked");
        }
        currentProof = createProofTypeObject(selectedProof.val());
        updateAnnualIncomeValue();

        $maxCalculatedIncome.text(cgm.formatMoney($maxCalculatedIncome.text()));
    }

    /* Functions */

    function getIncomeAmount(individuals) {
        var amount = null;
        var maxAmount = null;

        $.each(cgm.eligibility.incomeAmounts, function (index, item) {
            if (maxAmount === null || maxAmount.NumberOfPeopleInHousehold < item.NumberOfPeopleInHousehold) {
                maxAmount = item;
            }

            if (item.NumberOfPeopleInHousehold === individuals) {
                amount = item;
            }
        });

        amount = amount || maxAmount;

        return amount;
    }

    function getIncomeLine(individuals) {
        var amount = getIncomeAmount(individuals);

        return amount.IncomeBaseAmount + amount.IncomeIncrementalAmount * (individuals - amount.NumberOfPeopleInHousehold);
    }

    function additionalIncomeFieldsNeeded(individuals) {
        var amount = getIncomeAmount(individuals);
        return amount && amount.ShowAdditionalFields;
    }

    function createProofTypeObject(proofTypeName) {
        return new window[proofTypeName]();
    }

    function updateAnnualIncomeValue() {
        $(".annual-income").text(cgm.formatMoney(currentProof.getAnnualIncome()));
    }

    /* Functions */

    function showNextStep(control) {
        var currentStep = $(control).parents(".page-step");
        if (currentStep.length > 0) {
            var allPageSteps = $(".page-step");

            var currentIndex = allPageSteps.index(currentStep);

            if (currentIndex < allPageSteps.length - 1) {
                allPageSteps.eq(currentIndex + 1).fadeIn("fast");
                if (allPageSteps[currentIndex + 1].id === "TribalProgramm") {
                    $("#NVAdditional").fadeIn("fast");
                    $("#AnotherLifelineProviderDisclaimer").fadeIn("fast");
                }
                if (allPageSteps[currentIndex + 1].id === "Demographics") {
                    slider();
                    addFilter();
                    clickProgram();
                }
            }
        }
    }

    initDatePicker($(".pay-stub-list input.datetime"));

    function getSelectedIncomeProofType(selector) {
        return $(selector).attr("data-proof-income");
    }

    function getSelectedIncomeSubProofType(selector) {
        return $(selector).attr("data-proof-income");
    }

    function visibleIncomeCalculatorsBlock(incomeType) {
        var $incomeCalculatorsBlock = $(".incomeCalculatorsBlock");
        var $incomeCalculator = $incomeCalculatorsBlock.find(".income-calculator");

        if (incomeType !== "") {
            $incomeCalculator.hide();
            $incomeCalculatorsBlock.show();
            $incomeCalculatorsBlock.find("." + incomeType.toLowerCase() + "-income-block").show();
        } else {
            $incomeCalculator.hide();
            $incomeCalculatorsBlock.hide();
        }
    }

    function hideValidationFields() {
        $(".validation-summary-errors").remove();
        $(".field-validation-error span").text("");
    }

    function visibleHelpButton(selectedProof) {
        if (selectedProof === "FederalOrTribalNoticeLetterOfParticipationInGeneralAssistance") {
            $(".paystubs-income-block .help").hide();
        } else {
            $(".paystubs-income-block .help").show();
        }
    }

    $(".proofType").change(function () {
        selectedProof = $(this).val();

        currentProof = createProofTypeObject(selectedProof);

        hideAndResetProofs();

        var description = $(this).data("description");
        $(".income-tax-field label .income-tax-description").html(description).text();

        $("[data-proof=" + selectedProof + "]").show();

        if (selectedProof === "PayStubs" || selectedProof === "FederalOrTribalNoticeLetterOfParticipationInGeneralAssistance") {
            visibleHelpButton(selectedProof);
            addPayStub();
        }

        $(".ptSub").hide();
        $(".subProofTypes ." + selectedProof).show();

        var incomeProoftype = getSelectedIncomeProofType(this);
        visibleIncomeCalculatorsBlock(incomeProoftype);
        hideValidationFields();
        initHelpToggle();
    });

    $("input.incomeTaxType").change(function () {
        selectedProof = $(this).val();

        currentProof = createProofTypeObject(selectedProof);
        var description = $(this).data("description");
        $(".income-tax-field label .income-tax-description").html(description).text();
        $(".income-tax-field").show();

        $(".income-tax-samples .sample").hide();
        initHelpToggle();

        $(".annual-income").text(cgm.formatMoney(0));
        $(".money input").val("");
        var incomeProoftype = getSelectedIncomeSubProofType(this);
        visibleIncomeCalculatorsBlock(incomeProoftype);
        hideValidationFields();
    });

    function updatePayStubs() {
        var payStubs = $(".pay-stub-list .pay-stub");

        payStubs.each(function (index, item) {
            $(item).find("input.datetime").attr("name", "EligibilityModel.PayStubs[" + index + "].PayDate");
            $(item).find(".money input").attr("name", "EligibilityModel.PayStubs[" + index + "].PayWage");
            $(item).find(".field-validation-valid").attr("data-valmsg-for", "EligibilityModel.PayStubs[" + index + "].PayWage");
        });

        var form = $("#demographcisForm");

        form.removeData("validator");
        $.validator.unobtrusive.parse(form);
        cgm.customValidationSetup();

        if (payStubs.length === 1) {
            payStubs.find(".remove-pay-stub").hide();
        } else {
            payStubs.find(".remove-pay-stub").show();
        }

        if (payStubs.length === 20) {
            $(".add-pay-stub").hide();
        } else {
            $(".add-pay-stub").show();
        }
    }

    function addPayStub() {
        var line = $(".pay-line-template > *").clone();
        $(".pay-stub-list").append(line);

        updatePayStubs();
        initDatePicker(line.find("input.datetime").removeAttr("id"));
        validatePayStubs();
    }

    function removePayStub(context) {
        $(context).parent(".pay-stub").remove();
        updatePayStubs();
        updateAnnualIncomeValue();
        validatePayStubs();
    }

    function validatePayStubs() {
        updateAnnualIncomeValue();

        var valid = false;

        if ($(".pay-stub-list").is(":visible")) {
            valid = true;

            $(".pay-stub-list .pay-stub").each(function (index, item) {
                valid &= $(item).find("input.datetime").val() !== "" && $(item).find(".money input").val() !== "";
            });
        }

        if (valid) {
            $(".next.button").removeAttr("disabled");
        } else {
            $(".next.button").attr("disabled", "disabled");
        }
    }

    $(".individualsCount").bind("keyup input", function () {
        var value = $(this).val();

        if (additionalIncomeFieldsNeeded(value)) {
            $(".additional-income-fields").show();
        } else {
            hideAndResetAdditionalFields();
        }

        $(".income-fields").show();
        var incomeLine = getIncomeLine(value);
        $maxCalculatedIncome.text(cgm.formatMoney(incomeLine));
        $("input[name*=MaxCalculatedIncome]").val(incomeLine);
    });

    $(".income-tax-field .help").click(function () {
        var $chekcedIncomeTax = $("input[name*=IncomeTaxType]:checked").val();

        if ($.trim($chekcedIncomeTax) === "") {
            $chekcedIncomeTax = $("input[name*=ProofType]:checked").val();
        }

        $(".income-tax-samples .sample")
            .filter("[data-income-tax-type=" + $chekcedIncomeTax + "]").toggle();
    });

    function initHelpToggle() {
        var $incomeTaxFieldHelp = $(".income-tax-field .help");

        $incomeTaxFieldHelp.removeClass("helpCross");
        $incomeTaxFieldHelp.toggle(
            function() {
                $incomeTaxFieldHelp.addClass("helpCross");
            },
            function() {
                $(".income-tax-field .help").removeClass("helpCross");
            }
        );
    }

    $(".add-pay-stub").click(function () {
        addPayStub();
    });

    $(".money input").bind("keyup input", updateAnnualIncomeValue);

    $(document).on("change", "input[name*=PayDate]", validatePayStubs);

    $(document).on("keyup input", "input[name*=PayWage]", validatePayStubs);

    $(document).on("click", ".remove-pay-stub", function () {
        removePayStub(this);
    });

    initDshs();

    function showNextStepOnChange() {
        showNextStep(this);
    }

    /* Handlers */

    $(".alreadyReceiving[value=False], .confirmUnderstanding[value=True], .tribalResident[value=False], .landlineServiceProvider[value=False]")
        .change(showNextStepOnChange);

    if (cgm.eligibility.benefitPortingEnabled === "True") {
        window.benefitPorting.registerEvent("onContinue", function () {
            showNextStep(":radio[name$=AlreadyReceiving]");
        });

        window.benefitPorting.registerEvent("onCancel", function () {
            cgm.cancelOrder("AlreadyReceivingLifelineSubsidy");
        });
    }

    $(".alreadyReceiving[value=True]").change(function () {
        if (cgm.eligibility.benefitPortingEnabled === "True") {
            window.benefitPorting.show();
        } else {
            window.dialogBox
                .clear()
                .content(messages.eligibility.alreadyReceivingLifelineSubsidy)
                .okHandler(function () {
                    cgm.cancelOrder("AlreadyReceivingLifelineSubsidy");
                })
                .show();
        }
    });

    $(".confirmUnderstanding[value=False]").change(function () {
        window.dialogBox
            .clear()
            .content(messages.eligibility.understandingNotConfirmed)
            .cancelText("No")
            .cancelHandler(function () {
                cgm.cancelOrder("UnderstandingNotConfirmed");
            })
            .okText("Yes")
            .okHandler(function () {
                $(".confirmUnderstanding[value=False]")
                    .removeAttr("checked")
                    .prop("checked", "checked");
                showNextStep($(".confirmUnderstanding[value=True]"));
            })
            .show();
    });

    $(".landlineServiceProvider[value=True]").change(function () {
        window.dialogBox
            .clear()
            .content(messages.eligibility.landlineServiceProviderMessage)
            .cancelText("No")
            .cancelHandler(function () {
                cgm.cancelOrder("HasLandlineService");
            })
            .okText("Yes")
            .okHandler(function () {
                showNextStep(":radio[name$=LandlineServiceProvider]");
            })
            .show();
    });

    $(":radio[name$=SelectedTribe]").change(function () {
        $("#tribe-selection-dialog-ok-btn").removeAttr("disabled");
    });

    tribeSelectionDialogEvent();
    programChangeEvent();
}

function slider() {
    $(".regular").slick({
        dots: false,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1
    });
}

function clickProgram() {
    if (cgm.eligibility.isOrderAwaitingProof !== "True") {
        $("div.slick-slide").click(function () {
            changeProgram($(this).find("input:radio"));
            $(this).find("input:radio").attr("checked", "checked");
        });
    }
}

function addFilter() {
    $(".regular").slick("slickFilter", function (index) {
        return !($(this).hasClass("tribalProgram"));
    });
}

function initProgram(programCode, tribal) {
    if (programCode.length > 0) {
        slider();
        var addingFilter = tribal === "False";
        if (addingFilter) {
            addFilter();
        } else {
            $(".regular").slick("slickUnfilter");
        }
    }
}

function tribalInit(noLifelinePlansForTribalMessage, tribeSelectionEnabled) {
    $(".tribalResident").click(function () {
        var tribal = $(this).prop("checked");
        var $regular = $(".regular");

        if (tribal) {
            if (tribeSelectionEnabled === "True") {
                $("#tribe-selection").show();
            } else {
                $regular.slick("slickUnfilter");
            }
        }
        else {
            if (tribeSelectionEnabled === "True") {
                $(":radio[name$=SelectedTribe]").removeAttr("checked");
                $("#tribe-selection-dialog-ok-btn").attr("disabled", "disabled");
            }

            hideAndResetIncomeSection();
            addFilter();
        }

        $(".program").removeProp("checked");
        $regular.slick("slickGoTo", 0);

        initDshs();
        $("input[name$=IncomeBasedProgram]").val("false");
        hideAndResetIncomeSection();
        $(".next.button").hide();
    });
}

function tribeSelectionDialogEvent() {
    $("#tribe-selection-dialog-ok-btn").click(function () {
        $("#tribe-selection").hide();
        $(".program").removeProp("checked");
        $(".regular").slick("slickUnfilter");
    });

    $("#tribe-selection-dialog-cancel-btn").click(function () {
        $("#tribe-selection").hide();
        $(".tribalResident").removeAttr("checked");
        $(".program").removeProp("checked");
    });

    $("input[name*=IncomeBasedProgram]").change(function () {
        var calculateIncome = $(this).val();

        if (calculateIncome === "True") {
            $(".income-section").fadeIn("fast");
        }
        else {
            hideAndResetIncomeSection();
        }
        $(".collectStateConfirmationCode").show();
    });
}

function programChangeEvent() {
    $(".program").change(function () {
        changeProgram(this);
    });
}

function changeProgram(object) {
    $(".next.button").show();

    var program = $(object).parents("div");

    var selectedSlideIndex = program.data("slick-index");
    var totalSlides = $(".slick-track").find("div.slick-slide").length;

    calculateProgramPage(totalSlides, selectedSlideIndex);

    if (program.data("dshs") === "True") {
        $(".dshs-field").show();
    } else {
        hideAndResetDshs();
    }

    if (program.data("income")) {
        $("input[name$=IncomeBasedProgram]").val("true");
        $(".income-section").show();
    } else {
        $("input[name$=IncomeBasedProgram]").val("false");
        hideAndResetIncomeSection();
    }
}

function initDshs() {
    var $programRadioChecked = $(".program:radio:checked");

    if ($programRadioChecked.length === 0 || ($programRadioChecked.length > 0 && $programRadioChecked.parents("div").data("dshs") === "False")) {
        hideAndResetDshs();
    }
}

function calculateProgramPage(totalSlides, selectedSlideIndex) {
    var slidesOnPage = 4;
    var pages = totalSlides - slidesOnPage;
    var slides = $(".slick-slide");
    var vals = [];
    var i;

    for(i = 0; typeof (slides[i]) !== "undefined"; vals.push(slides[i++].getAttribute("data-slick-index") * 1)) {}

    var index = $.inArray(selectedSlideIndex * 1, vals);

    if (index !== -1) {
        if (index < totalSlides - slidesOnPage) {
            $(".regular").slick("slickGoTo", index);
        } else {
            $(".regular").slick("slickGoTo", pages);
        }
    }
}