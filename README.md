# PommeDeuxTerre

## A full stack web application that serves as platform for healthy people looking and sharing healthy recipes.

---
### **Built with :**
- **ReactJS** 
- **Django REST Framework** 

### Link to the website can be found here : [PommeDeuxTerre](https://pommedeuxterre-3bd49.web.app/)

### **Deployed with :**
 - Amazon S3
 - Heroku
 - Firebase

### **Features**
- Admin to create / update recipes
- Search your recipes based on Category or free-search
- Place a review on recipes

### **Admin Features**
- [Grapelli](https://grappelliproject.com/) layout
- Nested Admins - allow you to create or update nested models in a single page
- Assign Tags from choose from list widget
- Upload image display thumbnail

### **REST API Endpoints**
    /blog/posts/
    /blog/posts/{id}/reviews
    /blog/posts/{id}/user_review
    /blog/posts/{id}/review_post
    /blog/posts/{id}/review_update
    /blog/posts/?category={id}
    /blog/posts/?user={id}
    /blog/posts/?search={string}
    /blog/reviews/
    /blog/reviews/?post={id}
    /blog/reviews/?user={id}
    /blog/categories/
    admin/ 
    auth/
    accounts/create/
    accounts/token/
    accounts/me/
    api/
    reset_password/
    reset/<uidb64>/<token>/

### **Admin Sample :**
![Django Admin](/gitAssets/djangoadmin.gif)

### **PommeDeuxTerre Sample :**
![PommePage](/gitAssets/pdtpage.gif)
---
 The idea came from my wife who was looking for a way to keep track of all our recipes. I needed a simple project to begin with, hence I started my journey :smiley:
 
 ---

 **Note from author:** This is my first full stack application. Building and Learning ReactJS and Django REST framework on the go.

 ### Courses I took up to learn Full Stack Development
 1. [Django Tutorial for Beginners](https://www.youtube.com/watch?v=OTmQOjsl0eg&t=5833s)
 2. Udemy - React & Django FullStack
 3. Udemy - Build a backend REST API with Python & Django -Advanced
 4. Udemy - React Testing
---
 As of April/May 2020, I have been working on ensuring I test my code. I have understood the perks of Test Driven Development and have been putting much effort to add more tests and build tests first before a feature.

---
