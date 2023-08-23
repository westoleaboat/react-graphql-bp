# React with GraphQL HeadlessCMS - see live @ 
![Screenshot_select-area_20230823210712](https://github.com/westoleaboat/react-graphql-bp/assets/68698872/b551f614-f50a-496c-887d-761308d85502)

#### Overview
This project is a dynamic and feature-rich React website that seamlessly integrates with a Headless CMS (Content Management System) using GraphQL. It offers a captivating user experience and leverages modern web development technologies for efficient data fetching and dynamic content rendering.

![Screenshot_select-area_20230823214136](https://github.com/westoleaboat/react-graphql-bp/assets/68698872/1bf95a22-c98f-4ffe-acdb-fb76aca33b8a)

#### Key Features:

+ **GraphQL Integration**: The project demonstrates the power of GraphQL as a query language for efficiently retrieving data. GraphQL allows precise requests for specific data fields, reducing over-fetching and improving the overall performance of the website.

+ **Dynamic Routing**: The website employs React Router to enable dynamic routing. This means that each post has its own unique URL, enhancing SEO and providing users with a consistent and intuitive navigation experience.

+ **Fetching Posts**: With the 'AllPosts.js' component, users can access a list of all blog posts. It fetches post data from the Headless CMS and displays it in a user-friendly format. Clicking on a post title or 'Read more' link takes users to the full post.

+ **Formatted Date**: The project enhances the user experience by formatting dates in a human-readable way, such as "Monday, August 23, 2023."

+ **Single Post View**: The 'SinglePost.js' component allows users to view a single blog post. It fetches data based on the post's unique slug and displays it with a rich user interface. Users can navigate to the next and previous posts with ease.

+ **Author Information**: Users can learn more about the post's author through a section that displays the author's name, title, and an optional picture. This adds a personal touch to the content.

+ **Responsive Design**: The website boasts a responsive design, ensuring that it looks and works well on a variety of devices, from desktops to smartphones.

+ **Image Handling**: Images are handled gracefully, with optional placeholders for missing or undefined images, ensuring a visually pleasing and consistent layout.

+ **Markdown Support**: The project supports Markdown for formatting post content, providing an organized and visually appealing reading experience.

+ **Backlink to Blog**: A backlink to the blog's main page ensures users can easily return to the blog's home page for more content exploration.

## How To Use:

You need to provide a GraphQL token to use this example locally.

inside of ```.env``` add the following:

```.env
GRAPHQL_TOKEN=<your_token_id>
```

You'll need to create the model Post with the following fields.
![Screenshot_select-area_20230823213649](https://github.com/westoleaboat/react-graphql-bp/assets/68698872/743493c2-3c13-4d4d-b5a1-8e2f216242b1)


#### Download & run:
```
git clone https://github.com/westoleaboat/react-graphql-bp.git

cd react-graphql-bp

# install dependencies
npm install

# run locally
npm start
```

Remember to make sure you have Node.js and npm installed on your system before using these commands. You can check if they are installed by running:
```
node -v
npm -v
```

