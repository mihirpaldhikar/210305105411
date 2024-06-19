/*
 * Copyright (c) Food Yatri Authors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the “Software”), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { JSX } from "react";
import { StarIcon as StartOutlineIcon } from "@heroicons/react/24/outline";
import { StarIcon as StartFillIcon } from "@heroicons/react/24/solid";

interface RatingsProps {
  currentRating: number;
  maxRating?: number;
}

export default function Ratings({
  currentRating,
  maxRating = 5,
}: RatingsProps): JSX.Element {
  return (
    <div className={"flex items-center space-x-2 text-xs font-medium"}>
      {Array.from(Array(maxRating).keys()).map((num) => {
        if (num < currentRating) {
          return <StartFillIcon className={"w-5 fill-yellow-500"} key={num} />;
        }
        return <StartOutlineIcon className={"w-5"} key={num} />;
      })}
      <h5>
        {currentRating}/{maxRating}
      </h5>
    </div>
  );
}
