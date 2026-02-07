import {useAppDispatch, useAppSelector} from "../../app/store/hooks.ts";
import {
  fetchAllCategories,
  getCategories,
  getLoadingAllCategories
} from "../../app/Features/categorySlice.ts";
import {Grid} from "@mui/material";
import CategoryCard from "./CategoryCard/CategoryCard.tsx";
import {useEffect} from "react";
import Spinner from "../UI/Spinner/Spinner.tsx";

const CategoriesCards = () => {
  const categories = useAppSelector(getCategories);
  const dispatch = useAppDispatch();
  const loadingAllCategories = useAppSelector(getLoadingAllCategories);


  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch])

  return (
    <>
      {loadingAllCategories
        ?
        <Spinner isLoading={loadingAllCategories} />
        :
        categories.length === 0
          ?
          <h2>No categories!</h2>
          :
          <>
            <Grid
              container
              spacing={2}
              sx={{flexDirection: 'column', mt: 4, gap: 4, mb: 4}}
            >
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  type={category.type}
                  name={category.name}
                  id={category.id}
                />
              ))}
            </Grid>
          </>
      }
    </>
  );
};

export default CategoriesCards;