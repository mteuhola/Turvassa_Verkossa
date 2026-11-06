CREATE TABLE public.feedback (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    visitor_uuid uuid NOT NULL,
    feedback text NOT NULL CHECK (char_length(btrim(feedback)) BETWEEN 1 AND 5000),
    created_at timestamptz NOT NULL DEFAULT now()
);
