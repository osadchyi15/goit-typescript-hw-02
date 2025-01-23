import { useEffect, useState, MouseEvent, FC } from "react";
import "./App.css";
import { fetchResponseData } from "./services/api";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/Loader/Loader";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import toast from "react-hot-toast";
import ImageModal from "./components/ImageModal/ImageModal";
import ToTopButton from "./components/ToTopButton/ToTopButton";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { Items, ImageInfo, ToastPosition, Response } from "./types";

const App: FC = () => {
  const [responseData, setResponseData] = useState<Items>([]);
  const [clientQuery, setClientQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadMoreVisible, setIsLoadMoreVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [fullImage, setFullImage] = useState<ImageInfo>({
    fullUrl: "",
    alt: "",
  });
  const [windowScroll, setWindowScroll] = useState<boolean>(false);

  const handleMoreBtn = () => {
    setPage((prev) => prev + 1);
  };

  const toastPosition: ToastPosition = {
    position: "bottom-right",
    reverseOrder: true,
  };

  useEffect(() => {
    const getResponseData = async () => {
      if (!clientQuery) {
        setIsLoadMoreVisible(false);
        return;
      }

      try {
        setIsLoading(true);
        setIsError(false);
        setIsLoadMoreVisible(false);
        const { results, total_pages }: Response =
          await fetchResponseData<Response>({
            query: clientQuery,
            page,
            per_page: 15,
          });
        setResponseData((prev) => [...prev, ...results]);
        setTotalPages(total_pages);

        if (page === totalPages) {
          setIsLoadMoreVisible(false);
          toast("You have reached the end of the collection!", {
            icon: "💫",
            ...toastPosition,
          });
        } else {
          setIsLoadMoreVisible(true);
        }

        if (results.length === 0) {
          setIsLoadMoreVisible(false);
          toast.error(
            `We couldn't find anything. \n Please, modify the request!`,
            {
              ...toastPosition,
            }
          );
        }
        setIsLoading(false);
      } catch (error: any) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getResponseData();
  }, [clientQuery, page]);

  const handleChangeQuery = (newQuery: string): void => {
    if (newQuery.trim().length === 0) {
      toast.error(
        `You are sending an empty request. \n Please, modify the request!`,
        {
          ...toastPosition,
        }
      );
      setResponseData([]);
      setIsLoadMoreVisible(false);
      setClientQuery("");
      return;
    } else if (newQuery.toLowerCase() === clientQuery.toLowerCase()) {
      toast.error("Your request has not changed.\nPlease modify the request!", {
        ...toastPosition,
      });
      setIsLoadMoreVisible(false);
      return;
    }
    setClientQuery(newQuery);
    setResponseData([]);
    setPage(1);
  };

  const imageHandler = (e: MouseEvent<HTMLImageElement>) => {
    setFullImage({ fullUrl: "", alt: "" });
    const fullInfo: ImageInfo = {
      fullUrl: e.currentTarget.dataset.url,
      alt: e.currentTarget.alt,
    };
    setFullImage(fullInfo);
    setIsModalOpen(true);
  };

  const onCloseModal = (): void => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleScroll = (): void => {
      window.scrollY > 100 ? setWindowScroll(true) : setWindowScroll(false);
    };
    window.addEventListener("scroll", handleScroll);
  }, [window.scrollY]);

  const onClickTopButton = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setWindowScroll(false);
  };

  return (
    <>
      <SearchBar
        onSearchChanged={handleChangeQuery}
        clientQuery={clientQuery}
      />
      <div className="gallery">
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {responseData.length > 0 && (
          <ImageGallery data={responseData} imageHandler={imageHandler} />
        )}
        {isLoadMoreVisible && <LoadMoreBtn onClick={handleMoreBtn} />}
        {isModalOpen && (
          <ImageModal
            imageInfo={fullImage}
            isModalOpen={isModalOpen}
            onCloseModal={onCloseModal}
          />
        )}
        {windowScroll && <ToTopButton onClickTopButton={onClickTopButton} />}
      </div>
    </>
  );
};

export default App;
