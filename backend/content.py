"""
Static content data for the Gamified NCERT Learning App.
All content is rule-based / manually authored (no external AI APIs used),
as required by the hackathon technical constraints.
"""

CONTENT = {
    "mathematics": {
        "subject_name": "Mathematics",
        "topics": [
            {
                "id": "math_real_numbers",
                "name": "Real Numbers",
                "activities": [
                    {
                        "id": "math_real_numbers_quiz",
                        "type": "quiz",
                        "title": "Real Numbers Quiz",
                        "xp": 20,
                        "questions": [
                            {"q": "What is the HCF of 12 and 18?", "options": ["4", "6", "9", "12"], "answer": 1},
                            {"q": "Every composite number can be expressed as a product of primes. This is called:", "options": ["Euclid's Division Lemma", "Fundamental Theorem of Arithmetic", "Prime Factorization Rule", "HCF Theorem"], "answer": 1},
                            {"q": "Is √2 a rational or irrational number?", "options": ["Rational", "Irrational", "Whole number", "Integer"], "answer": 1},
                            {"q": "LCM of 4 and 6 is:", "options": ["10", "12", "24", "8"], "answer": 1},
                            {"q": "The decimal expansion of a rational number is either terminating or:", "options": ["Non-terminating non-repeating", "Non-terminating repeating", "Always terminating", "Always zero"], "answer": 1}
                        ]
                    },
                    {
                        "id": "math_real_numbers_match",
                        "type": "match",
                        "title": "Match the Terms",
                        "xp": 15,
                        "pairs": [
                            {"left": "HCF", "right": "Highest Common Factor"},
                            {"left": "LCM", "right": "Lowest Common Multiple"},
                            {"left": "√2", "right": "Irrational Number"},
                            {"left": "22/7", "right": "Rational Number"},
                            {"left": "Euclid's Lemma", "right": "a = bq + r"}
                        ]
                    },
                    {
                        "id": "math_real_numbers_sequence",
                        "type": "sequence",
                        "title": "Order the Steps: Euclid's Division Algorithm",
                        "xp": 25,
                        "correct_order": [
                            "Apply Euclid's division lemma to a and b (a > b)",
                            "If remainder r = 0, then b is the HCF",
                            "If r ≠ 0, apply the lemma to b and r",
                            "Repeat until remainder becomes 0",
                            "The divisor at that stage is the HCF"
                        ]
                    }
                ]
            },
            {
                "id": "math_polynomials",
                "name": "Polynomials",
                "activities": [
                    {
                        "id": "math_polynomials_quiz",
                        "type": "quiz",
                        "title": "Polynomials Quiz",
                        "xp": 20,
                        "questions": [
                            {"q": "The degree of the polynomial 3x² + 2x + 1 is:", "options": ["1", "2", "3", "0"], "answer": 1},
                            {"q": "A polynomial with degree 2 is called:", "options": ["Linear", "Quadratic", "Cubic", "Constant"], "answer": 1},
                            {"q": "Zeros of a polynomial are the values where p(x) equals:", "options": ["1", "0", "-1", "x"], "answer": 1},
                            {"q": "Sum of zeros of ax² + bx + c is:", "options": ["-b/a", "c/a", "b/a", "-c/a"], "answer": 0},
                            {"q": "How many zeros can a quadratic polynomial have at most?", "options": ["1", "2", "3", "0"], "answer": 1}
                        ]
                    },
                    {
                        "id": "math_polynomials_match",
                        "type": "match",
                        "title": "Match Polynomial Types",
                        "xp": 15,
                        "pairs": [
                            {"left": "Degree 1", "right": "Linear Polynomial"},
                            {"left": "Degree 2", "right": "Quadratic Polynomial"},
                            {"left": "Degree 3", "right": "Cubic Polynomial"},
                            {"left": "Sum of zeros", "right": "-b/a"},
                            {"left": "Product of zeros", "right": "c/a"}
                        ]
                    },
                    {
                        "id": "math_polynomials_sequence",
                        "type": "sequence",
                        "title": "Order the Steps: Finding Zeros of a Quadratic",
                        "xp": 25,
                        "correct_order": [
                            "Write the polynomial in standard form ax² + bx + c",
                            "Factorize or apply the quadratic formula",
                            "Set each factor equal to zero",
                            "Solve for x",
                            "Verify by substituting back into the polynomial"
                        ]
                    }
                ]
            },
            {
                "id": "math_quadratic_equations",
                "name": "Quadratic Equations",
                "activities": [
                    {
                        "id": "math_quadratic_quiz",
                        "type": "quiz",
                        "title": "Quadratic Equations Quiz",
                        "xp": 20,
                        "questions": [
                            {"q": "The standard form of a quadratic equation is:", "options": ["ax + b = 0", "ax² + bx + c = 0", "ax³ + bx = 0", "a/x + b = 0"], "answer": 1},
                            {"q": "The discriminant formula is:", "options": ["b² - 4ac", "b² + 4ac", "4ac - b²", "2b - ac"], "answer": 0},
                            {"q": "If discriminant = 0, the roots are:", "options": ["Real and unequal", "Real and equal", "Imaginary", "Undefined"], "answer": 1},
                            {"q": "If discriminant < 0, the roots are:", "options": ["Real", "Equal", "Not real", "Zero"], "answer": 2},
                            {"q": "Quadratic formula gives x equal to:", "options": ["(-b ± √D)/2a", "(b ± √D)/a", "(-b ± D)/2a", "b/2a"], "answer": 0}
                        ]
                    },
                    {
                        "id": "math_quadratic_match",
                        "type": "match",
                        "title": "Match Discriminant Conditions",
                        "xp": 15,
                        "pairs": [
                            {"left": "D > 0", "right": "Two distinct real roots"},
                            {"left": "D = 0", "right": "Two equal real roots"},
                            {"left": "D < 0", "right": "No real roots"},
                            {"left": "D = b² - 4ac", "right": "Discriminant"},
                            {"left": "ax² + bx + c = 0", "right": "Standard Form"}
                        ]
                    },
                    {
                        "id": "math_quadratic_sequence",
                        "type": "sequence",
                        "title": "Order the Steps: Solving by Factorization",
                        "xp": 25,
                        "correct_order": [
                            "Write the equation in standard form",
                            "Split the middle term",
                            "Factor by grouping",
                            "Set each factor to zero",
                            "Solve for the two values of x"
                        ]
                    }
                ]
            },
            {
                "id": "math_arithmetic_progressions",
                "name": "Arithmetic Progressions",
                "activities": [
                    {
                        "id": "math_ap_quiz",
                        "type": "quiz",
                        "title": "Arithmetic Progressions Quiz",
                        "xp": 20,
                        "questions": [
                            {"q": "An AP has a constant:", "options": ["Ratio", "Common difference", "Product", "Exponent"], "answer": 1},
                            {"q": "The nth term formula of an AP is:", "options": ["a + (n-1)d", "a + nd", "a - (n-1)d", "an"], "answer": 0},
                            {"q": "Sum of first n terms formula is:", "options": ["n/2 [2a+(n-1)d]", "n[2a+(n-1)d]", "n/2[a+d]", "2a+(n-1)d"], "answer": 0},
                            {"q": "In the AP 2, 4, 6, 8..., the common difference is:", "options": ["1", "2", "3", "4"], "answer": 1},
                            {"q": "The first term of an AP is usually denoted by:", "options": ["a", "d", "n", "S"], "answer": 0}
                        ]
                    },
                    {
                        "id": "math_ap_match",
                        "type": "match",
                        "title": "Match AP Terms",
                        "xp": 15,
                        "pairs": [
                            {"left": "a", "right": "First term"},
                            {"left": "d", "right": "Common difference"},
                            {"left": "n", "right": "Number of terms"},
                            {"left": "an", "right": "nth term"},
                            {"left": "Sn", "right": "Sum of n terms"}
                        ]
                    },
                    {
                        "id": "math_ap_sequence",
                        "type": "sequence",
                        "title": "Order the Steps: Finding the nth Term",
                        "xp": 25,
                        "correct_order": [
                            "Identify the first term (a)",
                            "Find the common difference (d)",
                            "Apply the formula an = a + (n-1)d",
                            "Substitute the value of n",
                            "Calculate the final term value"
                        ]
                    }
                ]
            },
            {
                "id": "math_trigonometry",
                "name": "Introduction to Trigonometry",
                "activities": [
                    {
                        "id": "math_trig_quiz",
                        "type": "quiz",
                        "title": "Trigonometry Quiz",
                        "xp": 20,
                        "questions": [
                            {"q": "sin θ is defined as:", "options": ["Opposite/Hypotenuse", "Adjacent/Hypotenuse", "Opposite/Adjacent", "Hypotenuse/Opposite"], "answer": 0},
                            {"q": "The value of sin 90° is:", "options": ["0", "1", "-1", "0.5"], "answer": 1},
                            {"q": "cos θ is defined as:", "options": ["Opposite/Hypotenuse", "Adjacent/Hypotenuse", "Opposite/Adjacent", "Adjacent/Opposite"], "answer": 1},
                            {"q": "tan θ equals:", "options": ["sin θ / cos θ", "cos θ / sin θ", "1/sin θ", "sin θ × cos θ"], "answer": 0},
                            {"q": "The value of cos 0° is:", "options": ["0", "1", "-1", "Undefined"], "answer": 1}
                        ]
                    },
                    {
                        "id": "math_trig_match",
                        "type": "match",
                        "title": "Match Trigonometric Ratios",
                        "xp": 15,
                        "pairs": [
                            {"left": "sin θ", "right": "Opposite/Hypotenuse"},
                            {"left": "cos θ", "right": "Adjacent/Hypotenuse"},
                            {"left": "tan θ", "right": "Opposite/Adjacent"},
                            {"left": "sin 90°", "right": "1"},
                            {"left": "cos 0°", "right": "1"}
                        ]
                    },
                    {
                        "id": "math_trig_sequence",
                        "type": "sequence",
                        "title": "Order the Steps: Finding a Trig Ratio",
                        "xp": 25,
                        "correct_order": [
                            "Identify the right-angled triangle",
                            "Label the opposite, adjacent, and hypotenuse sides",
                            "Choose the required ratio (sin, cos, or tan)",
                            "Substitute the side lengths into the ratio",
                            "Simplify to get the final value"
                        ]
                    }
                ]
            }
        ]
    },
    "science": {
        "subject_name": "Science",
        "topics": [
            {
                "id": "sci_chemical_reactions",
                "name": "Chemical Reactions and Equations",
                "activities": [
                    {
                        "id": "sci_chem_quiz",
                        "type": "quiz",
                        "title": "Chemical Reactions Quiz",
                        "xp": 20,
                        "questions": [
                            {"q": "Rusting of iron is an example of:", "options": ["Physical change", "Oxidation reaction", "Reduction reaction", "Sublimation"], "answer": 1},
                            {"q": "A balanced chemical equation follows which law?", "options": ["Law of Conservation of Mass", "Law of Gravity", "Newton's Law", "Law of Multiple Proportions"], "answer": 0},
                            {"q": "In a combination reaction, two or more substances form:", "options": ["Multiple products", "One single product", "No product", "A precipitate only"], "answer": 1},
                            {"q": "Which reaction releases heat?", "options": ["Endothermic", "Exothermic", "Neutral", "Reversible"], "answer": 1},
                            {"q": "Displacement reaction involves a more reactive element replacing a:", "options": ["Less reactive element", "Gas", "Solvent", "Catalyst"], "answer": 0}
                        ]
                    },
                    {
                        "id": "sci_chem_match",
                        "type": "match",
                        "title": "Match Reaction Types",
                        "xp": 15,
                        "pairs": [
                            {"left": "Combination Reaction", "right": "A + B → AB"},
                            {"left": "Decomposition Reaction", "right": "AB → A + B"},
                            {"left": "Displacement Reaction", "right": "A + BC → AC + B"},
                            {"left": "Oxidation", "right": "Gain of oxygen"},
                            {"left": "Reduction", "right": "Loss of oxygen"}
                        ]
                    },
                    {
                        "id": "sci_chem_sequence",
                        "type": "sequence",
                        "title": "Order the Steps: Balancing a Chemical Equation",
                        "xp": 25,
                        "correct_order": [
                            "Write the unbalanced equation with correct formulas",
                            "Count atoms of each element on both sides",
                            "Add coefficients to balance atoms",
                            "Recheck the count on both sides",
                            "Write the final balanced equation"
                        ]
                    }
                ]
            },
            {
                "id": "sci_acids_bases_salts",
                "name": "Acids, Bases and Salts",
                "activities": [
                    {
                        "id": "sci_acid_quiz",
                        "type": "quiz",
                        "title": "Acids, Bases and Salts Quiz",
                        "xp": 20,
                        "questions": [
                            {"q": "The pH of a neutral solution is:", "options": ["0", "7", "14", "1"], "answer": 1},
                            {"q": "Acids turn blue litmus paper:", "options": ["Red", "Blue", "Green", "Colorless"], "answer": 0},
                            {"q": "Bases turn red litmus paper:", "options": ["Blue", "Red", "Yellow", "No change"], "answer": 0},
                            {"q": "A pH less than 7 indicates a solution is:", "options": ["Basic", "Acidic", "Neutral", "Salt"], "answer": 1},
                            {"q": "Common salt (NaCl) is formed by the reaction of:", "options": ["Acid + Base", "Acid + Acid", "Base + Base", "Water only"], "answer": 0}
                        ]
                    },
                    {
                        "id": "sci_acid_match",
                        "type": "match",
                        "title": "Match Acid-Base Terms",
                        "xp": 15,
                        "pairs": [
                            {"left": "pH = 7", "right": "Neutral"},
                            {"left": "pH < 7", "right": "Acidic"},
                            {"left": "pH > 7", "right": "Basic"},
                            {"left": "Acid + Base", "right": "Salt + Water"},
                            {"left": "Litmus", "right": "Natural Indicator"}
                        ]
                    },
                    {
                        "id": "sci_acid_sequence",
                        "type": "sequence",
                        "title": "Order the Steps: Testing pH with Litmus",
                        "xp": 25,
                        "correct_order": [
                            "Take a small sample of the solution",
                            "Dip red and blue litmus paper into it",
                            "Observe the color change",
                            "Compare with a standard pH color chart",
                            "Conclude whether the solution is acidic, basic, or neutral"
                        ]
                    }
                ]
            },
            {
                "id": "sci_life_processes",
                "name": "Life Processes",
                "activities": [
                    {
                        "id": "sci_life_quiz",
                        "type": "quiz",
                        "title": "Life Processes Quiz",
                        "xp": 20,
                        "questions": [
                            {"q": "The process by which plants make food is called:", "options": ["Respiration", "Photosynthesis", "Excretion", "Digestion"], "answer": 1},
                            {"q": "The basic functional unit of the kidney is:", "options": ["Neuron", "Nephron", "Alveolus", "Villus"], "answer": 1},
                            {"q": "Human beings breathe in:", "options": ["Oxygen", "Carbon dioxide", "Nitrogen only", "Hydrogen"], "answer": 0},
                            {"q": "Digestion of starch begins in the:", "options": ["Stomach", "Mouth", "Small intestine", "Large intestine"], "answer": 1},
                            {"q": "The muscular organ that pumps blood is the:", "options": ["Lungs", "Heart", "Liver", "Kidney"], "answer": 1}
                        ]
                    },
                    {
                        "id": "sci_life_match",
                        "type": "match",
                        "title": "Match Organs to Functions",
                        "xp": 15,
                        "pairs": [
                            {"left": "Heart", "right": "Pumps blood"},
                            {"left": "Kidney", "right": "Filters blood/excretion"},
                            {"left": "Lungs", "right": "Gas exchange"},
                            {"left": "Stomach", "right": "Digestion"},
                            {"left": "Chlorophyll", "right": "Photosynthesis"}
                        ]
                    },
                    {
                        "id": "sci_life_sequence",
                        "type": "sequence",
                        "title": "Order the Steps: Human Digestion Pathway",
                        "xp": 25,
                        "correct_order": [
                            "Food enters the mouth and is chewed",
                            "Food travels through the esophagus",
                            "Food is broken down in the stomach",
                            "Nutrients are absorbed in the small intestine",
                            "Waste is eliminated through the large intestine"
                        ]
                    }
                ]
            },
            {
                "id": "sci_light",
                "name": "Light – Reflection and Refraction",
                "activities": [
                    {
                        "id": "sci_light_quiz",
                        "type": "quiz",
                        "title": "Light Quiz",
                        "xp": 20,
                        "questions": [
                            {"q": "The bouncing back of light from a surface is called:", "options": ["Refraction", "Reflection", "Dispersion", "Diffraction"], "answer": 1},
                            {"q": "The bending of light when it passes from one medium to another is:", "options": ["Reflection", "Refraction", "Absorption", "Scattering"], "answer": 1},
                            {"q": "A concave mirror can form a:", "options": ["Real image only", "Virtual image only", "Real or virtual image", "No image"], "answer": 2},
                            {"q": "The image formed by a plane mirror is:", "options": ["Real and inverted", "Virtual and erect", "Real and erect", "Virtual and inverted"], "answer": 1},
                            {"q": "The unit of power of a lens is:", "options": ["Meter", "Diopter", "Candela", "Newton"], "answer": 1}
                        ]
                    },
                    {
                        "id": "sci_light_match",
                        "type": "match",
                        "title": "Match Light Concepts",
                        "xp": 15,
                        "pairs": [
                            {"left": "Reflection", "right": "Bouncing of light"},
                            {"left": "Refraction", "right": "Bending of light"},
                            {"left": "Concave Mirror", "right": "Converging mirror"},
                            {"left": "Convex Lens", "right": "Converging lens"},
                            {"left": "Diopter", "right": "Unit of lens power"}
                        ]
                    },
                    {
                        "id": "sci_light_sequence",
                        "type": "sequence",
                        "title": "Order the Steps: Ray Diagram for a Convex Lens",
                        "xp": 25,
                        "correct_order": [
                            "Draw the principal axis and lens",
                            "Mark the focus and object position",
                            "Draw a ray parallel to the axis passing through the focus",
                            "Draw a ray through the optical center undeviated",
                            "Locate the image where the rays intersect"
                        ]
                    }
                ]
            },
            {
                "id": "sci_electricity",
                "name": "Electricity",
                "activities": [
                    {
                        "id": "sci_elec_quiz",
                        "type": "quiz",
                        "title": "Electricity Quiz",
                        "xp": 20,
                        "questions": [
                            {"q": "The SI unit of electric current is:", "options": ["Volt", "Ampere", "Ohm", "Watt"], "answer": 1},
                            {"q": "Ohm's Law states V equals:", "options": ["I/R", "I × R", "R/I", "I + R"], "answer": 1},
                            {"q": "The SI unit of resistance is:", "options": ["Ampere", "Volt", "Ohm", "Watt"], "answer": 2},
                            {"q": "In a series circuit, current is:", "options": ["Same everywhere", "Different at each point", "Zero", "Only at the source"], "answer": 0},
                            {"q": "The unit of electrical power is:", "options": ["Joule", "Watt", "Ampere", "Ohm"], "answer": 1}
                        ]
                    },
                    {
                        "id": "sci_elec_match",
                        "type": "match",
                        "title": "Match Electrical Quantities",
                        "xp": 15,
                        "pairs": [
                            {"left": "Current", "right": "Ampere"},
                            {"left": "Voltage", "right": "Volt"},
                            {"left": "Resistance", "right": "Ohm"},
                            {"left": "Power", "right": "Watt"},
                            {"left": "V = IR", "right": "Ohm's Law"}
                        ]
                    },
                    {
                        "id": "sci_elec_sequence",
                        "type": "sequence",
                        "title": "Order the Steps: Verifying Ohm's Law",
                        "xp": 25,
                        "correct_order": [
                            "Set up a circuit with a battery, resistor, and ammeter",
                            "Connect a voltmeter across the resistor",
                            "Note the voltage and current readings",
                            "Repeat for different voltage values",
                            "Plot V vs I to confirm a straight line graph"
                        ]
                    }
                ]
            }
        ]
    }
}
