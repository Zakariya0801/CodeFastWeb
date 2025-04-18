import { useEffect, useState } from "react";
import axiosInstance from "../../Utils/axiosInstance";
import { Trash2, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import TopBar from "../Shared/Topbar";
import axios from "axios";

interface Suggestions {
  _id: string;
  Email: string;
  Type: string;
  Suggestion: string;
  createdAt: string;
}

const Feedback = () => {
  const [suggestions, setSuggestions] = useState<Suggestions[]>([]);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const res = await axiosInstance.get("/suggestion/");
      setSuggestions(res.data.data);
    } catch (err: any) {
      handleHttpError(err, "Failed to load feedback");
    }
  };

  const deleteSuggestion = async (id: string) => {
    try {
      await axiosInstance.delete(`/suggestion/${id}`);
      setSuggestions((prev) => prev.filter((s) => s._id !== id));
      toast.success("Suggestion removed successfully.");
    } catch (err: any) {
      handleHttpError(err, "Failed to delete suggestion");
    }
  };

  const handleHttpError = (err: any, defaultMsg: string) => {
    if (axios.isAxiosError(err)) {
      const status = err.response?.status;

      switch (status) {
        case 401:
          toast.error("Unauthorized access. Please log in.");
          break;
        case 403:
          toast.error("Forbidden. You do not have permission.");
          break;
        case 404:
          toast.error("Resource not found.");
          break;
        case 500:
          toast.error("Server error. Please try again later.");
          break;
        default:
          toast.error(defaultMsg);
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <TopBar title="Feedback" />

      <div className="w-full p-6">
        <div className="text-2xl font-semibold text-gray-800 mb-6">
          User Suggestions
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-x-auto border border-gray-200">
          <table className="min-w-full table-auto text-sm text-gray-800">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4 text-left">User</th>
                <th className="px-6 py-4 text-left">Type</th>
                <th className="px-6 py-4 text-left">Suggestion</th>
                <th className="px-6 py-4 text-left">Created At</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {suggestions.length > 0 ? (
                suggestions.map((s, index) => (
                  <tr
                    key={s._id}
                    className={`transition duration-150 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {s.Email}
                    </td>
                    <td className="px-6 py-4 font-medium text-indigo-600">
                      {s.Type}
                    </td>
                    <td className="px-6 py-4 whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {s.Suggestion}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(s.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-4">
                      <button
                        onClick={() => deleteSuggestion(s._id)}
                        className="text-red-500 hover:text-red-600 transition p-1 rounded-full hover:bg-red-100"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                      <button
                        onClick={() => deleteSuggestion(s._id)}
                        className="text-green-500 hover:text-green-600 transition p-1 rounded-full hover:bg-green-100"
                        title="Mark as Reviewed"
                      >
                        <CheckCircle size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-10 text-gray-400 text-base"
                  >
                    No feedback available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
