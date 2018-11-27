DROP TABLE IF EXISTS recipe;

CREATE TABLE recipe (
recipe_id serial NOT NULL primary key,
recipe_name varchar(120) NOT NULL,
ingredients text NOT NULL,
instructions text NOT NULL
);

INSERT INTO recipe VALUES (1, 'shepherds pie', 'potatoes, milk, butter, ground beef, mixed vegetables, sauce, cheddar cheese', 'Boil potatoes, drain water, add milk and butter, mix well. Cook ground beef, vegetables and sauce together. Add mashed potatoes on top of the ground beef mixture, sprinkle with cheddar cheese. Bake in the oven at 375F for 20 min. Enjoy.'), 
						  (2, 'cream of tomato soup', 'onions, carrots, tomatoes, spices, chicken broth', 'Cook chopped onions and carrots, add tomatoes, chicken broth, and spices. Cook for 30 min. Use a hand blender to mix well together. Enjoy.');
