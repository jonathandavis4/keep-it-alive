from os import listdir

from PIL import Image


image_data = {}
for image_file in listdir('img'):
    filename_without_extension = image_file[:-4]
    with Image.open('img/{}'.format(image_file)) as img:
        image_data[filename_without_extension] = []
        for j in range(20):
            for i in range(20):
                image_data[filename_without_extension].append(img.getpixel((i, j)))


with open('js/fish_images.js', 'w') as output_file:
    for image_name, data in image_data.items():
        line = 'var {} = ['.format(image_name);
        for i, item in enumerate(data):
            line += '[{}, {}, {}]'.format(
                item[0],
                item[1],
                item[2]
            )
            if i < len(data) - 1:
                line += ', '
        line += '];'
        output_file.write(line);