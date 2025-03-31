import { BLOGS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const blogsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => ({
        url: BLOGS_URL,       
      }),
      providesTags: ["Blog"],
      keepUnusedDataFor: 5,
    }),
    getBlogDetails: builder.query({
      query: (blogId) => ({
        url: `${BLOGS_URL}/${blogId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createBlog: builder.mutation({
      query: () => ({
        url: BLOGS_URL,
        method: "POST",
      }),
      invalidatesTags: [
        "Blog",
      ] /* stops it from being cashed (always new data loading to the page) */,
    }),
    // updateBlog: builder.mutation({
    //   query: ({ id, title, author, content, image }) => ({
    //     url: `${BLOGS_URL}/${id}`, 
    //     method: "PUT",
    //     body: { title, author, content, image },
    //   }),
    //   invalidatesTags: ["Blog"], // Invalidate Poem cache after updating
    // }),

     updateBlog: builder.mutation({
          query: (data) => ({
            url: `${BLOGS_URL}/${data.blogId}`,
            method: "PUT",
            body: data,
          }),
          invalidatesTags: ["Blog"] /**cleans cash for later reload */,
        }),

    uploadBlogImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteBlog: builder.mutation({
      query: (blogId) => ({
        url: `${BLOGS_URL}/${blogId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogDetailsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useUploadBlogImageMutation,
  useDeleteBlogMutation,
} = blogsApiSlice;
