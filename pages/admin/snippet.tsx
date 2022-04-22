import Link from "next/link";
import InputUpload from "../../components/InputUpload";
import { FileData } from "../../services/file";

import { useAuth } from "../../hooks/useAuth";
import { useFormik } from "formik";
import { addSnippet } from "../../services/snippet";
import { ReactElement } from "react";
import Layout from "../../containers/Layout";

interface IPost {
  title: string;
  images: FileData[];
  tags: string;
  uid: string;
}

export default function Post() {
  const { checking, uid } = useAuth();
  const imagePath = `images/${uid}`;
  const formik = useFormik<IPost>({
    initialValues: {
      title: "",
      images: [],
      tags: "",
      uid: "",
    },

    onSubmit: (values: IPost) => {
      if (!formik.values.images.length) {
        alert("image required");
        return;
      }

      const newTags = values.tags
        .split(",")
        .filter(Boolean)
        .map((t) => t.trim());

      addSnippet({
        images: values.images,
        tags: newTags,
        title: values.title,
        uid,
      }).then((res) => {
        formik.setValues({
          images: [],
          tags: "",
          title: "",
          uid: "",
        });
      });
    },
  });

  const onUploaded = (files: FileData[]) => {
    formik.setValues({ ...formik.values, ...{ images: files } });
  };

  return (
    <div
      className="flex items-center justify-center"
      style={{ height: "calc(100vh - 106px)" }}
    >
      {checking ? "Loading" : ""}
      <div className="w-96 mx-8">
        <div className="bg-white rounded-md shadow-2xl">
          <h2 className="text-md text-center font-semibold uppercase p-4 bg-gray-50 border-b">
            Post your snippet !
          </h2>

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 p-4"
          >
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Title"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700"
              >
                Tags
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  onChange={formik.handleChange}
                  value={formik.values.tags}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Tags"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Images
              </label>
              <InputUpload path={imagePath} onUploaded={onUploaded} />
            </div>

            <div className="flex gap-3">
              <button
                // onClick={onSubmit}
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
              <Link passHref href={"/"}>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

Post.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
