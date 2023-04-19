<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="header section">
            <h2>Welcome to Yummy Food!</h2>
            <p>
              This is a sample application accompanying an article on Hasura
              GraphQL Engine. The article is published in three parts.
            </p>
            <div class="articles">
              <ol>
                <li><a href="">Part 1</a></li>
                <li><a href="">Part 2</a></li>
                <li><a href="">Part 3</a></li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="section higlight">
            <h2>Technologies used</h2>
            <p>Here's a lsit of the major fameworks used tin his sample</p>
            <ol>
              <li><a href="">Vue.js</a></li>
              <li>
                <a href="">Authentication/Authorization</a> with
                <a href="">auth0</a>
              </li>
              <li><a href="">Hasura GraphQL Engine</a></li>
              <li><a href="">Apollo Client for Vue.js</a></li>
              <li><a href="">Heroku</a> to host Hasura Engine</li>
            </ol>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="section">
            <h2>Enhancements</h2>
            <p>
              This application is far from being complete. It's just a
              playground to show how we can mix auth0, Vue.js, Apollo Client
              GraphQL and Hasura GraphQL Engine all together. Yet many things
              could be added and enhanced. Hopefully I will be working on adding
              the features below and of course welcoming any assistance with
              that :-)
            </p>
            <ol>
              <li>Allow the user to delete a Recipe</li>
              <li>Allow the user to create a new Recipe</li>
              <li>Allow the user to delete a Recipe Ingredient</li>
              <li>Allow the user to list all Ingredients</li>
              <li>Allow the user to create an Ingredient</li>
              <li>Allow the user to edit an Ingredient</li>
              <li>Allow the user to delete an Ingredient</li>
              <li>Allow the user to list all Food Categories</li>
              <li>Allow the user to create a Food Category</li>
              <li>Allow the user to edit a Food Category</li>
              <li>Allow the user to delete a Food Category</li>
              <li>
                Add form validation to all forms above, including editing a
                Recipe
              </li>
              <li>
                Refactor the Recipe-Ingredient Form to a separate Vue Component
              </li>
              <li>Enhance the UI experience</li>
              <li>And many other things</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home"
};
</script>

<style scoped>
ol {
  padding: 0;
  margin: 0 0 0 20px;
}
li {
  margin-top: 5px;
}
ol li a {
  padding: 5px;
  color: #333;
}
ol li a:hover {
  text-decoration: none;
  border-bottom: solid 2px #333;
}
.section {
  margin: 0;
  margin-top: 20px;
  padding: 20px;
}
.header {
  margin-top: 0;
}
.higlight {
  background-color: #eee;
}
</style>
